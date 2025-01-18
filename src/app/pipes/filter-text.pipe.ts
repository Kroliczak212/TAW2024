import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterTextPipe implements PipeTransform {
  transform(value: any[], filterText: string): any[] {
    if (!value || !filterText) {
      return value;
    }

    filterText = filterText.toLowerCase();

    return value.filter(item => item.text?.toLowerCase().includes(filterText));
  }
}
