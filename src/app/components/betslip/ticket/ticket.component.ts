import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../../../store/app.reducer';
import * as BetslipSelectors from '../store/betslip.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnDestroy {
  ticketSubscription: Subscription;

  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    this.ticketSubscription = this.store
      .select(BetslipSelectors.ticketSelector)
      .subscribe((ticket) => console.log(ticket));
  }

  ngOnDestroy(): void {
    this.ticketSubscription.unsubscribe();
  }
}
