import { Component, ElementRef, forwardRef, inject, ViewChild } from '@angular/core';
import { TriService } from '../../services/TriService';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from '../../models/Category';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'category-selection',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './category-selection.component.html',
  styleUrl: './category-selection.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySelectionComponent),
      multi: true
    }
  ]
})
export class CategorySelectionComponent implements ControlValueAccessor{

  constructor(private eRef: ElementRef) {}

  @ViewChild('inputNewCategory') inputNewCategory: ElementRef<HTMLInputElement> | undefined;

  private onChange = (value: number[] | null) => {};
  private onTouched = () => {};

  async writeValue(categoryIds: number[]): Promise<void> {
    this.selectedCategories = [];
    if (this.categories == null || this.categories.length == 0) {
      this.categories = await firstValueFrom(this.triService.fetchAllCategories());
    }
    // Find categories with the given ids
    this.categories?.forEach((c) => {
      if (categoryIds.includes(c.id)) {
        this.selectedCategories.push(c);
      }
    });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

  triService = inject(TriService);
  categories: Category[] | null = null;
  selectedCategory: Category;
  selectedValues: number[] = [];
  selectedCategories: Category[] = [];
  isCatOpen: boolean = false;
  isCatPublished: boolean = false;

  onChangeValue(){
    this.addCategory(this.selectedCategory);
    this.onChange(this.selectedCategories.map((c) => c.id));
  }

  addCategory(category: Category) {
    this.selectedCategories.push(category);
    this.categories = this.categories?.filter((c) => c.id != category.id) ?? [];
  }

  ngOnInit() {
    this.refreshCategories();
  }

  removeCategory(category: Category) {
    this.selectedCategories = this.selectedCategories.filter((c) => c.id != category.id);
    this.categories?.push(category);
    this.onChange(this.selectedCategories.map((c) => c.id));
  }

  refreshCategories() {
    this.triService.fetchAllCategories().subscribe({
      next: (data) => {
        this.categories = data.filter((c) => !this.selectedCategories.some((sc) => sc.id == c.id));
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
      }
    });
  }

  openNewCategory() {
    if (this.inputNewCategory) this.inputNewCategory.nativeElement.style.display = 'block';
    this.inputNewCategory?.nativeElement.focus();
    this.isCatOpen = true;
  }

  closeNewCategory() {
    if (this.inputNewCategory) this.inputNewCategory.nativeElement.style.display = 'none';
    this.isCatOpen = false;
  }

  onNewCategory($event: any) {
    let content = $event.target.value.trim();
    if (content.length > 0) {
      this.triService.createCategory(content).subscribe({
        next: (data) => {
          this.refreshCategories();
          this.closeNewCategory();
          this.showTimedPublished();
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
        }
      });
    }

  }

  showTimedPublished(){
    this.isCatPublished = true;
    setTimeout(() => {
      this.isCatPublished = false;
    }, 3000);
  }
}
