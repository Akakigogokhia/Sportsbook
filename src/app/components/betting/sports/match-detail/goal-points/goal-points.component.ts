import { Component, Input, OnInit } from '@angular/core';
import { Period } from 'src/app/shared/models/market.model';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-goal-points',
  templateUrl: './goal-points.component.html',
  styleUrls: ['./goal-points.component.scss'],
})
export class GoalPointsComponent implements OnInit {
  @Input() period: Period;
  @Input() specialMarkets: SpecialMarkets;
  @Input() sportId: number;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.specialMarkets = this.filterService.getGoalOdds(this.specialMarkets);
  }
}
