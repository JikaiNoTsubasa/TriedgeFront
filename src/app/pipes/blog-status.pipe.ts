import { Pipe, PipeTransform } from '@angular/core';
import { BlogStatus } from '../models/Blog';

@Pipe({
  name: 'blogStatus'
})
export class BlogStatusPipe implements PipeTransform {

  transform(value: BlogStatus, ...args: unknown[]): string {
    switch (value) {
      case BlogStatus.DRAFT:
        return '<i class="fa-solid fa-circle-half-stroke"></i>';
      case BlogStatus.PUBLISHED:
        return '<i class="fa-solid fa-circle-check"></i>';
    }
  }

}
