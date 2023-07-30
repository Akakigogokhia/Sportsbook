import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/models/response.models';
import { OddsService } from '../../services/odds.service';

@Component({
  selector: 'app-match-preview',
  templateUrl: './match-preview.component.html',
  styleUrls: ['./match-preview.component.scss'],
})
export class MatchPreviewComponent implements OnInit {
  @Input() match: Event;

  doubleChance: { homeOrDraw: string; homeOrAway: string; drawOrAway: string };

  ngOnInit(): void {
    const home = this.match.periods?.num_0.money_line?.home || 0;
    const draw = this.match.periods?.num_0.money_line?.draw || 0;
    const away = this.match.periods?.num_0.money_line?.away || 0;

    this.doubleChance = this.oddsService.doubleChance(home, draw, away);

    this.match = this.oddsService.convertOddsAndTimezone(this.match);
  }

  constructor(private oddsService: OddsService) {}
}
