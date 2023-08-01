import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../../../store/app.reducer';
import * as BetslipSelectors from '../store/betslip.selectors';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/shared/models/betting.models';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnDestroy {
  ticketSubscription: Subscription;
  ticket: Ticket;

  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    this.ticketSubscription = this.store
      .select(BetslipSelectors.ticketSelector)
      .subscribe((ticket) => {
        (this.ticket = ticket), console.log(ticket);
      });
  }

  ngOnDestroy(): void {
    this.ticketSubscription.unsubscribe();
  }
}
