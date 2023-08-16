import { Component, Input, OnInit } from '@angular/core';
import { Event, Totals } from 'src/app/shared/models/market.model';
import { OddsService } from '../../services/odds.service';
import * as FromApp from '../../../../store/app.reducer';
import * as BettingActions from '../../store/betting.actions';
import { Store } from '@ngrx/store';
import { BetsliptService } from 'src/app/components/betslip/services/betslip.service';

@Component({
  selector: 'app-match-preview',
  templateUrl: './match-preview.component.html',
  styleUrls: ['./match-preview.component.scss'],
})
export class MatchPreviewComponent implements OnInit {
  @Input() match: Event;
  @Input() sportId: number;
  home: number;
  draw: number;
  away: number;
  totals: Totals;
  defaultTotal: string;

  doubleChance: { homeOrDraw: string; homeOrAway: string; drawOrAway: string };

  ngOnInit(): void {
    this.match = this.oddsService.convertOddsAndTimezone(this.match, '');
    this.totals = this.match.periods?.num_0.totals!;
    if (this.totals) {
      this.defaultTotal =
        this.sportId === 1 && this.totals.hasOwnProperty('2.5')
          ? '2.5'
          : Object.keys(this.totals)[0];
    }
    this.home = this.match.periods?.num_0?.money_line?.home || 0;
    this.draw = this.match.periods?.num_0?.money_line?.draw || 0;
    this.away = this.match.periods?.num_0?.money_line?.away || 0;

    this.doubleChance = this.oddsService.doubleChance(
      this.home,
      this.draw,
      this.away
    );
  }

  loadDetails() {
    this.store.dispatch(BettingActions.SelectMatch({ market: this.match }));
  }

  addBet(odd: number, bet_type: string, position: string) {
    this.betslipService.addBet(
      this.match.event_id,
      this.match.home,
      this.match.away,
      this.match.starts,
      bet_type,
      position,
      odd
    );
  }

  constructor(
    private oddsService: OddsService,
    private store: Store<FromApp.AppState>,
    private betslipService: BetsliptService
  ) {}
}
