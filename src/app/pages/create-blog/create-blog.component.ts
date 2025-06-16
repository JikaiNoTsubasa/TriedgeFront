import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownEditorComponent } from "../../comps/markdown-editor/markdown-editor.component";
import { TriService } from '../../services/TriService';
import { Router } from '@angular/router';
import { CategorySelectionComponent } from "../../comps/category-selection/category-selection.component";

@Component({
  selector: 'app-create-blog',
  imports: [ReactiveFormsModule, MarkdownEditorComponent, CategorySelectionComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent {

  triService = inject(TriService);
  router = inject(Router);

  createBlogForm = new FormGroup({
    name: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    image: new FormControl(''),
    categories: new FormControl([])
  });

  onSubmitCreate(){
    if (this.createBlogForm.valid) {
      let title: string = this.createBlogForm.value.name ?? '';
      let content: string = this.createBlogForm.value.content ?? '';
      let image: string | undefined = this.createBlogForm.value.image ?? undefined;
      this.triService.createBlog(title, content, image).subscribe({
        next: (blog) => {
          console.log(blog);
          this.createBlogForm.reset();
          this.router.navigate(['manage-blogs']);
        },
        error: (e) => {
        },
        complete: () => {
        }
      });
    }else{
      console.log('Invalid form');
    }
  }
}
