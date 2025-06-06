import { Component, Input } from '@angular/core';
import { Blog } from '../../models/Blog';

@Component({
  selector: 'blog-row',
  imports: [],
  templateUrl: './blog-row.component.html',
  styleUrl: './blog-row.component.scss'
})
export class BlogRowComponent {

  @Input() blog: Blog;


}
