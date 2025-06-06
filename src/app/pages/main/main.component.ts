import { Component, inject } from '@angular/core';
import { TriService } from '../../services/TriService';
import { Blog } from '../../models/Blog';
import { CommonModule } from '@angular/common';
import { BlogRowComponent } from "../../comps/blog-row/blog-row.component";

@Component({
  selector: 'app-main',
  imports: [CommonModule, BlogRowComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  triService = inject(TriService);

  blogs: Blog[] | null = null;

  loadingBlogs: boolean = false;

  ngOnInit(){
    this.refreshBlogs();
  }
  
  refreshBlogs(){
    this.loadingBlogs = true;
    this.triService.fetchBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
      },
      complete: () => {
        this.loadingBlogs = false;
      }
    });
    
  }
}
