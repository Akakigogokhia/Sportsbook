import { Component, OnDestroy, OnInit } from '@angular/core';
import * as BettingSelector from '../../store/betting.selectors';
import * as FromApp from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';
import { Event } from 'src/app/shared/models/market.model';
import { FilterService } from '../../services/filter.service';

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
    private filterService: FilterService
  ) {}

  setOddsType(type: 'All' | 'I Half' | 'Goals') {
    this.oddsType = type;
  }

  ngOnInit(): void {
    this.marketSubscription = this.store
      .select(BettingSelector.selectMarket)
      .subscribe((market) => (this.market = market));
    this.specialMarketSubscription = this.store
      .select(BettingSelector.specialMarket)
      .subscribe((specialMarket) => {
        this.specialMarkets = specialMarket;
      });
    this.sportIdSubscription = this.store
      .select(BettingSelector.selectSportId)
      .subscribe((sportId) => (this.sportId = sportId));

    this.goalSpecialMarkets = this.filterService.getGoalOdds(
      this.specialMarkets!
    );

    console.log(this.specialMarkets);
  }

  ngOnDestroy(): void {
    this.marketSubscription.unsubscribe();
    this.specialMarketSubscription.unsubscribe();
    this.sportIdSubscription.unsubscribe();
  }
}
