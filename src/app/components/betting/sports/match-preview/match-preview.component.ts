import { Component, Input, OnInit } from '@angular/core';
import { Event, Totals } from 'src/app/shared/models/market.model';
import { OddsService } from '../../services/odds.service';
import * as FromApp from '../../../../store/app.reducer';
import * as BettingActions from '../../store/betting.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-match-preview',
  templateUrl: './match-preview.component.html',
  styleUrls: ['./match-preview.component.scss'],
})
export class MatchPreviewComponent implements OnInit {
  @Input() match: Event;
  @Input() sportId: number;
  totals: Totals;
  defaultTotal: string;

  doubleChance: { homeOrDraw: string; homeOrAway: string; drawOrAway: string };

  ngOnInit(): void {
    const home = this.match.periods?.num_0.money_line?.home || 0;
    const draw = this.match.periods?.num_0.money_line?.draw || 0;
    const away = this.match.periods?.num_0.money_line?.away || 0;

    this.doubleChance = this.oddsService.doubleChance(home, draw, away);

    this.match = this.oddsService.convertOddsAndTimezone(this.match);
    this.totals = this.match.periods?.num_0.totals!;
    this.defaultTotal =
      this.sportId === 1 ? '2.5' : Object.keys(this.totals)[0];
  }

  loadDetails() {
    this.store.dispatch(BettingActions.SelectMatch({ market: this.match }));
  }

  constructor(
    private oddsService: OddsService,
    private store: Store<FromApp.AppState>
  ) {}
}
