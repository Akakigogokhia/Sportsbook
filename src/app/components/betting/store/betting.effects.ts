import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BettingActions from './betting.actions';
import { map, switchMap } from 'rxjs';
import { SortingService } from '../services/sorting.service';
import { Injectable } from '@angular/core';
import { BettingService } from '../services/betting.service';

@Injectable()
export class BettingEffects {
  FetchFixtures = createEffect(() =>
    this.actions$.pipe(
      ofType(BettingActions.FetchFixtures),
      switchMap(() => {
        return this.bettingService.makeApiRequest().pipe(
          map((response) => {
            return BettingActions.SetPopularFixtures({
              popularFixtures: this.sortingService.sortByPopularity(
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
    private bettingService: BettingService,
    private sortingService: SortingService
  ) {}
}
