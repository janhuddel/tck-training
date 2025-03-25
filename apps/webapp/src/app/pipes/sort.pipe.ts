import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform<T>(array: T[]): T[] {
    if (!array) return [];
    return [...array].sort();
  }
}
