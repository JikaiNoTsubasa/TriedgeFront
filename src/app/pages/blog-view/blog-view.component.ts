import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TriService } from '../../services/TriService';
import { Blog } from '../../models/Blog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-view',
  imports: [ CommonModule ],
  templateUrl: './blog-view.component.html',
  styleUrl: './blog-view.component.scss'
})
export class BlogViewComponent {

  route = inject(ActivatedRoute);
  triService = inject(TriService);

  blog: Blog | null = null;

  ngOnInit(){
    this.refreshBlog();
  }

  refreshBlog(){
    const slug = this.route.snapshot.paramMap.get('slug');
    this.triService.fetchBlogBySlug(slug ?? '').subscribe({
      next: (data) => {
        this.blog = data;
      },
      error: (e) => {
        
      },
      complete: () => {

      }
    });
  }
}
