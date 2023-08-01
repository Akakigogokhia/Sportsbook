import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Event } from 'src/app/shared/models/market.model';
import { AppState } from 'src/app/store/app.reducer';
import * as BetslipActions from '../store/betslip.actions';

@Injectable({
  providedIn: 'root',
})
export class BetsliptService {
  constructor(private store: Store<AppState>) {}
  addBet = (
    id: number,
    home: string,
    away: string,
    starts: string,
    bet_type: string,
    position: string,
    odd: number
  ) => {
    this.store.dispatch(
      BetslipActions.AddBet({
        bet: {
          event_id: id,
          home: home,
          away: away,
          date: starts,
          bet_type: bet_type,
          position: position,
          odd: odd,
        },
      })
    );
  };
}
