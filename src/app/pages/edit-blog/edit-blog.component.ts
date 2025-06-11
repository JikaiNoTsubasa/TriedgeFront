import { Component, inject } from '@angular/core';
import { TriService } from '../../services/TriService';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Blog } from '../../models/Blog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownEditorComponent } from '../../comps/markdown-editor/markdown-editor.component';
import { CommonModule } from '@angular/common';
import { BlogStatusPipe } from "../../pipes/blog-status.pipe";

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [ReactiveFormsModule, MarkdownEditorComponent, CommonModule, BlogStatusPipe, RouterModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.scss'
})
export class EditBlogComponent {

  triService = inject(TriService);
  route = inject(ActivatedRoute);

  message: string | null = null;

  blog: Blog | null = null;

  editBlogForm = new FormGroup({
    name: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    image: new FormControl(''),
  });

  ngOnInit(){
    this.refreshBlog();
  }

  refreshBlog(){
    const id: number = parseInt(this.route.snapshot.paramMap.get('id') ?? "0");
    this.triService.fetchMyBlogById(id).subscribe({
      next: (data) => {
        this.blog = data;

        this.editBlogForm.setValue({
          name: this.blog.title,
          content: this.blog.content,
          image: this.blog.image,
        });
      },
      error: (e) => {
        
      },
      complete: () => {
        
      }
    })
  }

  onSubmitUpdate(){
    if (this.editBlogForm.valid) {
      let title: string = this.editBlogForm.value.name ?? '';
      let content: string = this.editBlogForm.value.content ?? '';
      let image: string | undefined = this.editBlogForm.value.image ?? undefined;
      this.triService.updateMyBlog(this.blog?.id ?? 0, title, content, image).subscribe({
        next: (blog) => {
          this.refreshBlog();
        },
        error: (e) => {
        },
        complete: () => {
          this.showMessageTimed('Blog updated properly');
        }
      });
    }
  }

  showMessageTimed(mess: string){
    this.message = mess;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }

  onPublish(){

  }

  onUnpublish(){

  }

  onDelete(){

  }
}
