import { Component, OnDestroy, OnInit } from '@angular/core';
import * as BettingSelector from '../../store/betting.selectors';
import * as FromApp from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';
import { Event } from 'src/app/shared/models/market.model';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent implements OnInit, OnDestroy {
  market: Event | null;
  specialMarkets: SpecialMarkets | null;
  marketSubscription: Subscription;
  specialMarketSubscription: Subscription;
  constructor(private store: Store<FromApp.AppState>) {}
  ngOnInit(): void {
    this.marketSubscription = this.store
      .select(BettingSelector.selectMarket)
      .subscribe((market) => (this.market = market));
    this.specialMarketSubscription = this.store
      .select(BettingSelector.specialMarket)
      .subscribe((specialMarket) => {
        this.specialMarkets = specialMarket;
      });

    console.log(this.specialMarkets);
  }

  ngOnDestroy(): void {
    this.marketSubscription.unsubscribe();
    this.specialMarketSubscription.unsubscribe();
  }
}
