import { Component, Input } from '@angular/core';
import { Event } from 'src/app/shared/models/market.model';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';

@Component({
  selector: 'app-all-odds',
  templateUrl: './all-odds.component.html',
  styleUrls: ['./all-odds.component.scss'],
})
export class AllOddsComponent {
  @Input() market: Event | null;
  @Input() specialMarkets: SpecialMarkets | null;
  @Input() sportId: number;

  constructor() {}
}
