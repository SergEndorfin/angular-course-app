import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {

  transform(minutes: number | string | null): string {

    if (minutes === null) throw new Error('Input value must fit number symbols.');
    if (typeof minutes === 'string') minutes = Number(minutes);
    if (isNaN(minutes)) return '00:00 hours';

    const hour = Math.floor(minutes / 60);
    const minutesLeft = minutes - (hour * 60);
    return `${hour.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')} 
            ${this.correctWordHours(hour)}`;
  }

  correctWordHours(hour: number) {
    return hour > 1 || hour === 0 ? 'hours' : 'hour';
  }
}
