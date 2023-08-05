import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/shared/models/betting.models';
import { AppState } from 'src/app/store/app.reducer';
import * as BetsliptSelectors from '../store/betslip.selectors';
import * as BetslipActions from '../store/betslip.actions';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit, OnDestroy {
  ticketSub: Subscription;
  tickets: Ticket[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ticketSub = this.store
      .select(BetsliptSelectors.activeTicketsSelector)
      .subscribe((tickets) => (this.tickets = tickets));
    this.tickets.forEach((ticket) => {
      ticket.bets.forEach((bet) => {
        if (!bet.status) {
          this.store.dispatch(BetslipActions.CheckBetStatus({ bet: bet }));
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.ticketSub.unsubscribe();
  }
}
