import { Component, inject } from '@angular/core';
import { TriService } from '../../services/TriService';
import { CommonModule } from '@angular/common';
import { Blog } from '../../models/Blog';
import { BlogStatusPipe } from "../../pipes/blog-status.pipe";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-blogs',
  imports: [CommonModule, BlogStatusPipe, RouterModule ],
  templateUrl: './manage-blogs.component.html',
  styleUrl: './manage-blogs.component.scss'
})
export class ManageBlogsComponent {

  triService = inject(TriService);

  blogs: Blog[] | null = null;
  loadingBlogs: boolean = false;
  error: string | null = null;

  ngOnInit(){
    this.refreshMyBlogs();
  }

  refreshMyBlogs(){
    this.loadingBlogs = true;
    this.triService.fetchMyBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loadingBlogs = false;
      },
      error: (e) => {
        this.error = (e as Error).message;
        this.loadingBlogs = false;
      },
      complete: () => {
      }
    });
  }
}
