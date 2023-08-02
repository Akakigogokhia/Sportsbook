import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BetsliptService } from 'src/app/components/betslip/services/betslip.service';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';
import { AppState } from 'src/app/store/app.reducer';
import * as BettingSelectors from '../../../store/betting.selectors';

@Component({
  selector: 'app-special-markets',
  templateUrl: './special-markets.component.html',
  styleUrls: ['./special-markets.component.scss'],
})
export class SpecialMarketsComponent implements OnInit {
  @Input() specialMarkets: SpecialMarkets | null;
  event_id: number;
  homeTeam: string;
  awayTeam: string;
  starts: string;
  marketSubscription: Subscription;

  constructor(
    private betslipService: BetsliptService,
    private store: Store<AppState>
  ) {}

  addBet(odd: number, bet_type: string, position: string) {
    this.betslipService.addBet(
      this.event_id,
      this.homeTeam,
      this.awayTeam,
      this.starts,
      bet_type,
      position,
      odd
    );
  }

  ngOnInit(): void {
    this.store.select(BettingSelectors.selectMarket).subscribe((market) => {
      this.event_id = market!.event_id;
      this.homeTeam = market!.home;
      this.awayTeam = market!.away;
      this.starts = market!.starts;
    });
  }
}
