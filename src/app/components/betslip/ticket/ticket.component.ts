import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../../../store/app.reducer';
import * as BetslipSelectors from '../store/betslip.selectors';
import * as BetslipActions from '../store/betslip.actions';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/shared/models/betting.models';
import { User } from '../../auth/auth.models';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnDestroy {
  ticketSubscription: Subscription;
  ticket: Ticket;
  betAmount: number = 1;
  potential_payout: number;
  repeatTicket: boolean;
  dialogBox: boolean = false;
  @Input() user: User | null;

  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    this.ticketSubscription = this.store
      .select(BetslipSelectors.ticketSelector)
      .subscribe((ticket) => {
        (this.ticket = ticket), console.log(ticket);
      });
  }

  changeBetAmount = (betAmount: number) => {
    this.potential_payout = betAmount * this.ticket.total_odd;
  };

  clearBets() {
    this.store.dispatch(BetslipActions.ClearTicket());
  }

  placeTicket() {
    this.dialogBox = true;
    this.ticket = {
      ...this.ticket,
      potential_payout: this.betAmount * this.ticket.total_odd,
    };
    this.store.dispatch(BetslipActions.PlaceTicket({ ticket: this.ticket }));
  }

  answerDialog(shouldSaveTicket: boolean) {
    if (!shouldSaveTicket) {
      this.store.dispatch(BetslipActions.ClearTicket());
    }
    this.dialogBox = false;
  }

  ngOnDestroy(): void {
    this.ticketSubscription.unsubscribe();
  }
}
