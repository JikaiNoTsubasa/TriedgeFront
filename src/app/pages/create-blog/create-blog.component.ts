import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { MarkdownEditorComponent } from "../../comps/markdown-editor/markdown-editor.component";

@Component({
  selector: 'app-create-blog',
  imports: [ReactiveFormsModule, MarkdownEditorComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent {

  createBlogForm = new FormGroup({
    name: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  onSubmit(){

  }
}
