import { createAction, props } from '@ngrx/store';
import { Bet, Status, Ticket } from 'src/app/shared/models/betting.models';

export const AddBet = createAction('[Betting] Addbet', props<{ bet: Bet }>());

export const RemoveBet = createAction(
  '[Bettin] RemoveBet',
  props<{ betId: number }>()
);

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
  props<{ id: number; bet_status: Status }>()
);

export const AddBalance = createAction(
  '[Betslip] AddBalance',
  props<{ amount: number }>()
);

export const LoadTickets = createAction('[Ticket] Load Tickets');
export const LoadTicketsSuccess = createAction(
  '[Ticket] LoadTicketsSuccess',
  props<{ tickets: Ticket[] }>()
);

export const SaveTicketSuccess = createAction('[Ticket] SaveTicketSuccess');
export const Fail = createAction('[Ticket] Fail', props<{ error: string }>());
