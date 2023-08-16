import { Component, Input } from '@angular/core';
import { BetsliptService } from 'src/app/components/betslip/services/betslip.service';
import { Event, Totals } from 'src/app/shared/models/market.model';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss'],
})
export class TotalsComponent {
  @Input() totals: Totals;
  @Input() total: string;
  @Input() match: Event;

  constructor(private betslipService: BetsliptService) {}

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
}
