import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TriService } from '../../services/TriService';
import { Blog } from '../../models/Blog';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-view',
  imports: [ CommonModule, MarkdownModule, RouterModule ],
  templateUrl: './blog-view.component.html',
  styleUrl: './blog-view.component.scss'
})
export class BlogViewComponent {

  route = inject(ActivatedRoute);
  triService = inject(TriService);

  blog: Blog | null = null;

  loadingBlog: boolean = false;

  ngOnInit(){
    this.refreshBlog();
  }

  refreshBlog(){
    this.loadingBlog = true;
    const slug = this.route.snapshot.paramMap.get('slug');
    this.triService.fetchBlogBySlug(slug ?? '').subscribe({
      next: (data) => {
        this.blog = data;
        this.loadingBlog = false;
      },
      error: (e) => {
        
      },
      complete: () => {

      }
    });
  }
}
