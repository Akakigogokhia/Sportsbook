import { Component, OnDestroy, OnInit } from '@angular/core';
import * as BettingSelector from '../../store/betting.selectors';
import * as FromApp from '../../../../store/app.reducer';
import * as BettingActions from '../../store/betting.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';
import { Event } from 'src/app/shared/models/market.model';
import { FilterService } from '../../services/filter.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent implements OnInit, OnDestroy {
  market: Event | null;
  specialMarkets: SpecialMarkets | null;
  sportId: number | null;
  marketSubscription: Subscription;
  specialMarketSubscription: Subscription;
  sportIdSubscription: Subscription;
  goalSpecialMarkets: SpecialMarkets;
  oddsType: 'All' | 'I Half' | 'Goals' = 'All';

  constructor(
    private store: Store<FromApp.AppState>,
    private filterService: FilterService,
    private location: Location
  ) {}

  setOddsType(type: 'All' | 'I Half' | 'Goals') {
    if (type === 'Goals') {
      this.goalSpecialMarkets = this.filterService.getGoalOdds(
        this.specialMarkets!
      );
    }
    this.oddsType = type;
  }

  ngOnInit(): void {
    this.market = JSON.parse(localStorage.getItem('market')!);
    this.store.dispatch(BettingActions.SelectMatch({ market: this.market! }));
    this.specialMarketSubscription = this.store
      .select(BettingSelector.specialMarket)
      .subscribe((specialMarkets) => {
        this.specialMarkets = specialMarkets;
      });
    this.sportIdSubscription = this.store
      .select(BettingSelector.selectSportId)
      .subscribe((sportId) => (this.sportId = sportId));
  }

  ngOnDestroy(): void {
    this.specialMarketSubscription.unsubscribe();
    this.sportIdSubscription.unsubscribe();
  }
}
