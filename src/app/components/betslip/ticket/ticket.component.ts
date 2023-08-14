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
  ticketSub: Subscription;
  ticket: Ticket;
  betAmount: number = 1;
  potential_payout: number;
  repeatTicket: boolean;
  dialogBox: boolean = false;
  balanceSub: Subscription;
  balance: number;
  @Input() user: User | null;

  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    this.balanceSub = this.store
      .select(BetslipSelectors.balanceSelector)
      .subscribe((balance) => {
        this.balance = balance;
      });
    this.ticketSub = this.store
      .select(BetslipSelectors.ticketSelector)
      .subscribe((ticket) => {
        (this.ticket = ticket), console.log(ticket);
      });
  }

  changeBetAmount = (betAmount: number) => {
    if (this.betAmount > 10000) {
      this.betAmount = 10000;
    }
    this.potential_payout = betAmount * this.ticket.total_odd;
  };

  clearBets() {
    this.store.dispatch(BetslipActions.ClearTicket());
  }

  placeTicket() {
    if (this.betAmount > 10000) {
      this.betAmount = 10000;
    }
    if (this.balance >= this.betAmount) {
      this.dialogBox = true;
      this.ticket = {
        ...this.ticket,
        total_stake: this.betAmount,
        potential_payout: this.betAmount * this.ticket.total_odd,
      };
      this.store.dispatch(BetslipActions.PlaceTicket({ ticket: this.ticket }));
      this.store.dispatch(
        BetslipActions.AddBalance({ amount: -this.betAmount })
      );
    } else
      this.store.dispatch(
        BetslipActions.Fail({
          error: 'Insufficient funds. Please add more money to continue.',
        })
      );
  }

  removeBet = (betId: number) => {
    this.store.dispatch(BetslipActions.RemoveBet({ betId: betId }));
  };

  answerDialog(shouldSaveTicket: boolean) {
    if (!shouldSaveTicket) {
      this.store.dispatch(BetslipActions.ClearTicket());
    }
    this.dialogBox = false;
  }

  changeStake = (amount: number) => {
    this.betAmount = amount;
  };

  ngOnDestroy(): void {
    this.ticketSub.unsubscribe();
    this.balanceSub.unsubscribe();
  }
}
