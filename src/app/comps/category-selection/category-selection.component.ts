import { Component, ElementRef, forwardRef, inject } from '@angular/core';
import { TriService } from '../../services/TriService';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from '../../models/Category';
import { CommonModule } from '@angular/common';

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

  private onChange = (value: number[] | null) => {};
  private onTouched = () => {};

  writeValue(categoryIds: number[]): void {
    this.selectedCategories = [];
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
  }

  refreshCategories() {
    this.triService.fetchAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
      }
    });
  }
}
