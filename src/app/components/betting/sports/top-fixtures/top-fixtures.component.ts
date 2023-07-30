import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as bettingSelector from '../../store/betting.selectors';
import { Event } from 'src/app/shared/models/response.models';
import { SortedEvents } from 'src/app/shared/models/betting.models';

@Component({
  selector: 'app-top-fixtures',
  templateUrl: './top-fixtures.component.html',
  styleUrls: ['./top-fixtures.component.scss'],
})
export class TopFixturesComponent implements OnInit {
  popularFixtures: SortedEvents;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select(bettingSelector.selectPopularFixtures)
      .subscribe(
        (fixtures) => (
          (this.popularFixtures = fixtures), console.log(this.popularFixtures)
        )
      );
  }
}
