import { Component, Input } from '@angular/core';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';

@Component({
  selector: 'app-special-markets',
  templateUrl: './special-markets.component.html',
  styleUrls: ['./special-markets.component.scss'],
})
export class SpecialMarketsComponent {
  @Input() specialMarkets: SpecialMarkets | null;
}
