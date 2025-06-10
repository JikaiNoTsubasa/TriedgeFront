import { Component, Input } from '@angular/core';
import { Blog } from '../../models/Blog';
import { RouterModule } from '@angular/router';
import { ShrinkPipe } from "../../pipes/shrink.pipe";

@Component({
  selector: 'blog-row',
  imports: [RouterModule, ShrinkPipe],
  templateUrl: './blog-row.component.html',
  styleUrl: './blog-row.component.scss'
})
export class BlogRowComponent {

  @Input() blog: Blog;


}
