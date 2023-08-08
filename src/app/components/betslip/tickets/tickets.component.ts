import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Bet, Ticket } from 'src/app/shared/models/betting.models';
import { AppState } from 'src/app/store/app.reducer';
import * as BetsliptSelectors from '../store/betslip.selectors';
import * as BetslipActions from '../store/betslip.actions';
import { BetsliptService } from '../services/betslip.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit, OnDestroy {
  ticketSub: Subscription;
  tickets: Ticket[];

  constructor(
    private store: Store<AppState>,
    private betslipService: BetsliptService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(BetslipActions.LoadTickets());
    this.ticketSub = this.store
      .select(BetsliptSelectors.activeTicketsSelector)
      .subscribe((tickets) => {
        this.tickets = tickets;
        console.log(tickets);
      });
  }

  check() {
    this.checkBetStatuses();
  }

  private checkBetStatuses(): void {
    const dispatchQueue: Bet[] = [];
    this.tickets.forEach((ticket) => {
      ticket.bets.forEach((bet) => {
        if (
          !bet.status &&
          +bet.date > new Date().getTime() + 2 * 60 * 60 * 1000
        ) {
          dispatchQueue.push(bet);
        }
      });
    });
    this.processDispatchQueue(dispatchQueue);
  }

  private processDispatchQueue(dispatchQueue: any[]) {
    const INTERVAL_MS = 210;
    let intervalId: any;
    console.log('boom called');
    const process = () => {
      if (dispatchQueue.length > 0) {
        const bet = dispatchQueue.shift();
        this.store.dispatch(BetslipActions.CheckBetStatus({ bet }));
      } else {
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(process, INTERVAL_MS);
  }

  ngOnDestroy(): void {
    this.ticketSub.unsubscribe();
  }
}
