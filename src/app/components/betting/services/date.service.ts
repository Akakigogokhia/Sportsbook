import { Injectable } from '@angular/core';
import { Event } from 'src/app/shared/models/response.models';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  isToday(date: Date) {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  filterStarted(fixtures: Event[]) {
    return fixtures.filter(
      (fixture) =>
        this.convertTimezone(new Date(fixture.starts)).getTime() >
        new Date().getTime()
    );
  }

  convertTimezone(date: Date): Date {
    return new Date(date.getTime() + 4 * 60 * 60 * 1000);
  }
}
