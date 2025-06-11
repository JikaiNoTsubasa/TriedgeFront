import { Pipe, PipeTransform } from '@angular/core';
import { BlogStatus } from '../models/Blog';

@Pipe({
  name: 'blogStatus'
})
export class BlogStatusPipe implements PipeTransform {

  transform(value: BlogStatus, ...args: string[]): string {
    let statusName = "";
    if (args.length > 0) statusName = ' '+args[0];
    switch (value) {
      case BlogStatus.DRAFT:
        return '<i class="fa-solid fa-circle-half-stroke"></i>' + statusName;
      case BlogStatus.PUBLISHED:
        return '<i class="fa-solid fa-circle-check"></i>' + statusName;
    }
  }

}
