import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Bet, Ticket } from 'src/app/shared/models/betting.models';
import { AppState } from 'src/app/store/app.reducer';
import * as BetsliptSelectors from '../store/betslip.selectors';
import * as BetslipActions from '../store/betslip.actions';
import { User } from '../../auth/auth.models';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit, OnDestroy {
  ticketSub: Subscription;
  tickets: Ticket[];
  toggle: boolean = true;
  @Input() user: User | null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.user) {
      this.store.dispatch(BetslipActions.LoadTickets());
    }

    this.ticketSub = this.store
      .select(BetsliptSelectors.activeTicketsSelector)
      .subscribe((tickets) => {
        this.tickets = tickets;
      });
  }

  checkBets() {
    if (this.user) {
      this.toggle = !this.toggle;
      this.checkBetStatuses();
    } else {
      this.store.dispatch(
        BetslipActions.Fail({ error: 'You are not authorized' })
      );
    }
  }

  private checkBetStatuses(): void {
    console.log(this.tickets);
    const dispatchQueue: Bet[] = [];
    this.tickets.forEach((ticket) => {
      ticket.bets.forEach((bet) => {
        if (
          bet.status === 'Pending' &&
          +bet.date + 2 * 60 * 60 * 1000 < new Date().getTime()
        ) {
          dispatchQueue.push(bet);
        }
      });
    });
    this.processDispatchQueue(dispatchQueue);
  }

  private processDispatchQueue(dispatchQueue: Bet[]) {
    const INTERVAL_MS = 210;
    let intervalId: any;
    const process = () => {
      if (dispatchQueue.length > 0) {
        const bet = dispatchQueue.shift()!;

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
