import { createAction, props } from '@ngrx/store';
import { Bet, Ticket } from 'src/app/shared/models/betting.models';

export const AddBet = createAction('[Betting] Addbet', props<{ bet: Bet }>());

export const ChangeBetAmount = createAction(
  '[Betting] ChangeBetAmount',
  props<{ betAmount: number }>()
);

export const CalculateTicket = createAction('[Betting] CalculateTicket');

export const ClearTicket = createAction('[Betting] ClearTicket');

export const PlaceTicket = createAction(
  '[Betting] PlaceTicket',
  props<{ ticket: Ticket }>()
);

export const CheckBetStatus = createAction(
  '[Betting] CheckBetStatus',
  props<{ bet: Bet }>()
);

export const SaveBetStatus = createAction(
  '[Bettin] SaveBetStatus',
  props<{ bet_status: boolean }>()
);
