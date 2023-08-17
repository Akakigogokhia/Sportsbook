import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as BettingActions from '../betting/store/betting.actions';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() filterControl: FormControl;
  @Input() sportId: number = 1;

  selectedDuration: number | string = 'Select duration';
  filterName: string;

  constructor(private store: Store<AppState>) {}

  changeSport = (sportId: number) => {
    this.sportId = sportId;
    this.store.dispatch(BettingActions.ChangeSport({ sport_id: sportId }));
    this.removeFilter();
  };

  filterByTime = (time: string | number) => {
    this.filterName =
      typeof time === 'number'
        ? time == 0.5
          ? '30 minutes'
          : time > 1
          ? time + ' hour'
          : time + ' hours'
        : time;

    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let end = new Date();
    end.setHours(23, 59, 59, 999);

    if (typeof time === 'number') {
      start = new Date();
      end = new Date(start.getTime() + time * 60 * 60 * 1000);
    } else if (time === 'Tomorrow') {
      start.setDate(start.getDate() + 1);
      end.setDate(end.getDate() + 1);
    } else if (time !== 'Today') {
      start.setDate(new Date(time).getDate());
    }
    this.store.dispatch(
      BettingActions.FilterByTime({ start: start, end: end })
    );
  };

  removeFilter() {
    this.filterName = '';
    this.selectedDuration = 'Select duration';
    this.store.dispatch(BettingActions.RemoveFilter());
  }
}
