import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'properDate'
})
export class ProperDatePipe implements PipeTransform {
  // input example: "24/01/2023"
  transform(dateStr: string): string {
    return dateStr
      .split('/')
      .map(val => val.padStart(2, '0'))
      .join('.');
  }
}
