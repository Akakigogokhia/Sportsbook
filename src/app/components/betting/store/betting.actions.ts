import { createAction, props } from '@ngrx/store';
import {
  GroupedEvents,
  SortedEvents,
  Ticket,
} from 'src/app/shared/models/betting.models';
import { Event } from 'src/app/shared/models/response.models';

export const FetchFixtures = createAction('[Betting] FetchFixtures');

export const SetFixtures = createAction(
  '[Betting] SetFixtures',
  props<{ allFixtures: Event[] }>()
);

export const SetPopularFixtures = createAction(
  '[Betting] SetPopularFixtures',
  props<{ popularFixtures: SortedEvents }>()
);

export const SetMarket = createAction(
  '[Betting] SetMarket',
  props<{ event_id: number }>()
);

export const SetTicket = createAction(
  '[Betting] SetTicket',
  props<{ ticket: Ticket }>()
);
