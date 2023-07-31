import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as BettingSelector from '../../store/betting.selectors';
import { SortedEvents } from 'src/app/shared/models/betting.models';

@Component({
  selector: 'app-top-fixtures',
  templateUrl: './top-fixtures.component.html',
  styleUrls: ['./top-fixtures.component.scss'],
})
export class TopFixturesComponent implements OnInit {
  sportId: number;
  popularFixtures: SortedEvents;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select(BettingSelector.selectActiveFixtures)
      .subscribe(
        (fixtures) => (
          (this.popularFixtures = fixtures), console.log(this.popularFixtures)
        )
      );
    this.store
      .select(BettingSelector.selectSportId)
      .subscribe((sportId) => (this.sportId = sportId!));
  }
}
