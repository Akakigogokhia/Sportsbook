import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BetslipActions from './betslip.actions';
import * as AuthSelector from '../../auth/store/auth.selectors';
import {
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { BetsliptService } from '../services/betslip.service';
import { Ticket } from 'src/app/shared/models/betting.models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as BetslipSelectors from '../store/betslip.selectors';

@Injectable()
export class BetslipEffects {
  Calculate = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BetslipActions.AddBet,
        BetslipActions.ChangeBetAmount,
        BetslipActions.RemoveBet
      ),
      map(() => BetslipActions.CalculateTicket())
    )
  );

  UpdateActiveTickets = createEffect(() =>
    this.actions$.pipe(
      ofType(BetslipActions.PlaceTicket, BetslipActions.SaveBetStatus),
      withLatestFrom(
        this.store.select(BetslipSelectors.activeTicketsSelector),
        this.store.select(AuthSelector.userIdSelector)
      ),
      switchMap(([, activeTickets, userId]) =>
        this.betSlipService.saveActiveTickets(activeTickets, userId!).pipe(
          map(() => BetslipActions.SaveTicketSuccess()),
          catchError((error) => {
            return of(BetslipActions.Fail({ error: error }));
          })
        )
      )
    )
  );

  CheckBetStatus = createEffect(() =>
    this.actions$.pipe(
      ofType(BetslipActions.CheckBetStatus),
      switchMap((action) =>
        this.betSlipService.betStatusCall(+action.bet.event_id).pipe(
          map((response) =>
            BetslipActions.SaveBetStatus({
              id: action.bet.id,
              results: this.betSlipService.sortPeriods(
                response.events![0].period_results!
              ),
              bet_status: this.betSlipService.checkBetStatus(
                action.bet,
                response.events![0].period_results!
              )
                ? 'Won'
                : 'Lost',
            })
          )
        )
      )
    )
  );

  LoadTickets = createEffect(() =>
    this.actions$.pipe(
      ofType(BetslipActions.LoadTickets),
      withLatestFrom(this.store.select(AuthSelector.userIdSelector)),
      mergeMap(([, userId]) =>
        this.betSlipService.getActiveTickets(userId!).pipe(
          map((tickets: Ticket[]) => {
            return BetslipActions.LoadTicketsSuccess({ tickets: tickets });
          }),
          catchError((error) => of(BetslipActions.Fail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private betSlipService: BetsliptService,
    private store: Store<AppState>
  ) {}
}
