import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BetslipActions from './betslip.actions';
import { map, switchMap, tap } from 'rxjs';
import { BetsliptService } from '../services/betslip.service';

@Injectable()
export class BetslipEffects {
  Calculate = createEffect(() =>
    this.actions$.pipe(
      ofType(BetslipActions.AddBet, BetslipActions.ChangeBetAmount),
      map(() => BetslipActions.CalculateTicket())
    )
  );

  CheckBetStatus = createEffect(() =>
    this.actions$.pipe(
      ofType(BetslipActions.CheckBetStatus),
      switchMap((action) =>
        this.betSlipService.betStatusCall(action.bet.event_id).pipe(
          map((response) =>
            BetslipActions.SaveBetStatus({
              bet_status: this.betSlipService.checkBetStatus(
                action.bet,
                response.event.period_results!
              ),
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private betSlipService: BetsliptService
  ) {}
}
