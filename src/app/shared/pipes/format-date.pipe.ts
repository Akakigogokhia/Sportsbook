import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from 'src/app/components/betting/services/date.service';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  constructor(private dateService: DateService) {}
  transform(date: string): string {
    const targetDate = new Date(date);
    if (this.dateService.isToday(targetDate)) {
      return 'today';
    } else {
      const datePipe = new DatePipe('en-Us');
      return datePipe.transform(targetDate, 'dd MMM')!;
    }
  }
}
