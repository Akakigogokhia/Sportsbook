import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BettingActions from './betting.actions';
import { map, switchMap, tap } from 'rxjs';
import { BettingService } from '../betting.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BettingEffects {
  FetchFixtures = createEffect(() =>
    this.actions$.pipe(
      ofType(BettingActions.FetchFixtures),
      switchMap(() => {
        return this.bettingService.makeApiRequest().pipe(
          map((response) => {
            return BettingActions.SetPopularFixtures({
              popularFixtures: this.bettingService.sortByPopularity(
                response.events
              ),
            });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private bettingService: BettingService
  ) {}
}
