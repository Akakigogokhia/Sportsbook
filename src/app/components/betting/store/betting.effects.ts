import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BettingActions from './betting.actions';
import { map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { SortingService } from '../services/sorting.service';
import { Injectable } from '@angular/core';
import { BettingService } from '../services/betting.service';
import { Router } from '@angular/router';

@Injectable()
export class BettingEffects {
  FetchFixtures = createEffect(() =>
    this.actions$.pipe(
      ofType(BettingActions.FetchFixtures, BettingActions.ChangeSport),
      switchMap((action) => {
        return this.bettingService.makeApiRequest(action.sport_id).pipe(
          map((response) => {
            if (action.sport_id === 1 || action.sport_id === 3) {
              return BettingActions.SetPopularFixtures({
                popularFixtures: this.sortingService.sortFixtures(
                  response.events,
                  action.sport_id
                ),
              });
            } else {
              return BettingActions.SetPopularFixtures({
                popularFixtures: this.sortingService.sortTennisFixtures(
                  response.events
                ),
              });
            }
          })
        );
      })
    )
  );

  OpenDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(BettingActions.SelectMatch),
      switchMap((action) => {
        return this.bettingService
          .getSpecialMarkets(+action.market.event_id)
          .pipe(
            map((response) => {
              return BettingActions.SetSpecialMarkets({
                specialMarkets: response.specials,
              });
            }),
            tap(() => {
              localStorage.setItem('market', JSON.stringify(action.market));
              this.router.navigate(['/fixture', +action.market.event_id]);
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private bettingService: BettingService,
    private sortingService: SortingService,
    private router: Router
  ) {}
}
