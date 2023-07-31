import { Component, OnDestroy, OnInit } from '@angular/core';
import * as BettingSelector from '../../store/betting.selectors';
import * as FromApp from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';
import { Event } from 'src/app/shared/models/market.model';
import { OddsService } from '../../services/odds.service';

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
  oddsType: 'All' | 'I Half' | 'Goals' = 'All';
  home: number;
  draw: number;
  away: number;
  doubleChance: { homeOrDraw: string; homeOrAway: string; drawOrAway: string };

  constructor(
    private store: Store<FromApp.AppState>,
    private oddsService: OddsService
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
    this.home = this.market?.periods?.num_0.money_line?.home || 0;
    this.draw = this.market?.periods?.num_0.money_line?.draw || 0;
    this.away = this.market?.periods?.num_0.money_line?.away || 0;
    console.log(this.specialMarkets);

    this.doubleChance = this.oddsService.doubleChance(
      this.home,
      this.draw,
      this.away
    );
  }

  ngOnDestroy(): void {
    this.marketSubscription.unsubscribe();
    this.specialMarketSubscription.unsubscribe();
  }
}
