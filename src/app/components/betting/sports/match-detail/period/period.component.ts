import { Component, Input, OnInit } from '@angular/core';
import { DoubleChance } from 'src/app/shared/models/betting.models';
import { Period } from 'src/app/shared/models/market.model';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';
import { FilterService } from '../../../services/filter.service';
import { OddsService } from '../../../services/odds.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss'],
})
export class PeriodComponent implements OnInit {
  @Input() specialMarkets: SpecialMarkets;
  @Input() period: Period;
  @Input() firstHalf: boolean;
  @Input() single: boolean;
  @Input() sportId: number;
  home: number;
  draw: number;
  away: number;
  doubleChance: DoubleChance;

  constructor(
    private filterService: FilterService,
    private oddsService: OddsService
  ) {}

  ngOnInit(): void {
    if (this.single)
      this.specialMarkets = this.filterService.getFirstHalfOdds(
        this.specialMarkets
      );
    this.home = this.period.money_line?.home || 1;
    this.draw = this.period.money_line?.draw!;
    this.away = this.period.money_line?.away || 1;

    if (this.draw)
      this.doubleChance = this.oddsService.doubleChance(
        this.home,
        this.draw,
        this.away
      );
  }
}
