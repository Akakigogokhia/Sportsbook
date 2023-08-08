import { Injectable } from '@angular/core';
import { Event } from 'src/app/shared/models/market.model';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  isSameDate(date: Date, date1: Date = new Date()) {
    return (
      date.getFullYear() === date1.getFullYear() &&
      date.getMonth() === date1.getMonth() &&
      date.getDate() === date1.getDate()
    );
  }

  filterStarted(fixtures: Event[]) {
    return fixtures
      .filter(
        (fixture) =>
          this.convertTimezone(new Date(fixture.starts)).getTime() >
          new Date().getTime()
      )
      .sort(
        (a: Event, b: Event) =>
          new Date(a.starts).getTime() - new Date(b.starts).getTime()
      );
  }

  convertTimezone(date: Date): Date {
    return new Date(date.getTime() + 4 * 60 * 60 * 1000);
  }
}
