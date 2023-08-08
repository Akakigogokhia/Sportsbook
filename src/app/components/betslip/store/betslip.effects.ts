import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BetslipActions from './betslip.actions';
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
      ofType(BetslipActions.AddBet, BetslipActions.ChangeBetAmount),
      map(() => BetslipActions.CalculateTicket())
    )
  );

  HandleTicketAdd = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BetslipActions.PlaceTicket),
        tap((action) => BetslipActions.UpdateActiveTickets)
      ),
    { dispatch: false }
  );

  UpdateActiveTickets = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BetslipActions.PlaceTicket),
        withLatestFrom(
          this.store.select(BetslipSelectors.activeTicketsSelector)
        ),
        switchMap(([action, activeTickets]) =>
          this.betSlipService.saveActiveTickets(activeTickets)
        )
      ),
    { dispatch: false }
  );

  CheckBetStatus = createEffect(() =>
    this.actions$.pipe(
      ofType(BetslipActions.CheckBetStatus),
      switchMap((action) =>
        this.betSlipService.betStatusCall(action.bet.event_id).pipe(
          map((response) =>
            BetslipActions.SaveBetStatus({
              id: action.bet.id,
              bet_status: this.betSlipService.checkBetStatus(
                action.bet,
                response.events![0].period_results!
              ),
            })
          )
        )
      )
    )
  );

  LoadTickets = createEffect(() =>
    this.actions$.pipe(
      ofType(BetslipActions.LoadTickets),
      mergeMap(() =>
        this.betSlipService.getActiveTickets().pipe(
          map((tickets: Ticket[]) =>
            BetslipActions.LoadTicketsSuccess({ tickets: tickets })
          ),
          catchError((error) =>
            of(BetslipActions.LoadTicketsFailure({ error }))
          )
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
