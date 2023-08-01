import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BetslipActions from './betslip.actions';
import { map } from 'rxjs';

@Injectable()
export class BetslipEffects {
  Calculate = createEffect(() =>
    this.actions$.pipe(
      ofType(BetslipActions.AddBet, BetslipActions.ChangeBetAmount),
      map(() => BetslipActions.CalculateTicket())
    )
  );
  constructor(private actions$: Actions) {}
}
