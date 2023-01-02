import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {

  transform(minutes: number): string {
    const hour = Math.floor(minutes / 60);
    const minutesLeft = minutes - (hour * 60);
    return `${hour.toString().padStart(2, '0')}:
            ${minutesLeft.toString().padStart(2, '0')} 
            ${this.correctWordHours(hour)}`;
  }

  correctWordHours(hour: number) {
    return hour > 1 ? 'hours' : 'hour';
  }
}
