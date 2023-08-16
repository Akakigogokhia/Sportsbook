import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as BettingSelector from '../../store/betting.selectors';
import { SortedEvents } from 'src/app/shared/models/betting.models';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import * as BettingActions from '../../store/betting.actions';

@Component({
  selector: 'app-top-fixtures',
  templateUrl: './top-fixtures.component.html',
  styleUrls: ['./top-fixtures.component.scss'],
})
export class TopFixturesComponent implements OnInit, OnDestroy {
  sportId: number;
  popularFixtures: SortedEvents;
  allFixtures: SortedEvents;
  popularFixturesSub: Subscription;
  sportIdSub: Subscription;
  filterControl = new FormControl('');
  filterInputSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.sportIdSub = this.store
      .select(BettingSelector.selectSportId)
      .subscribe((sportId) => {
        this.sportId = sportId!;
      });
    console.log(this.sportId);
    this.store.dispatch(
      BettingActions.FetchFixtures({ sport_id: this.sportId })
    );
    this.popularFixturesSub = this.store
      .select(BettingSelector.selectActiveFixtures)
      .subscribe(
        (fixtures) => (
          (this.popularFixtures = fixtures), (this.allFixtures = fixtures)
        )
      );

    this.filterInputSub = this.filterControl.valueChanges.subscribe(
      (value) =>
        (this.popularFixtures = this.filterService.searchFixtures(
          value!,
          this.allFixtures
        ) as SortedEvents)
    );
  }

  ngOnDestroy(): void {
    this.popularFixturesSub.unsubscribe();
    this.sportIdSub.unsubscribe();
  }
}
