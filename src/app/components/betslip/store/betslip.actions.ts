import { createAction, props } from '@ngrx/store';
import { Bet } from 'src/app/shared/models/betting.models';

export const AddBet = createAction('[Betting] Addbet', props<{ bet: Bet }>());

export const ChangeBetAmount = createAction(
  '[Betting] ChangeBetAmount',
  props<{ amount: number }>()
);

export const CalculateTicket = createAction('[Betting] CalculateTicket');
