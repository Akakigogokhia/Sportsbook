import { Component, Input } from '@angular/core';
import * as BetslipActions from '../store/betslip.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Bet } from 'src/app/shared/models/betting.models';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss'],
})
export class BetComponent {
  @Input() bet: Bet;
  @Input() isActive: boolean;

  constructor(private store: Store<AppState>) {}
  removeBet = (betId: number) => {
    this.store.dispatch(BetslipActions.RemoveBet({ betId: betId }));
  };
}
