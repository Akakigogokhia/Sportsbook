import { createAction, props } from '@ngrx/store';
import { SortedEvents, Ticket } from 'src/app/shared/models/betting.models';
import { Event } from 'src/app/shared/models/market.model';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';

export const FetchFixtures = createAction(
  '[Betting] FetchFixtures',
  props<{ sport_id: number }>()
);

export const SetFixtures = createAction(
  '[Betting] SetFixtures',
  props<{ allFixtures: Event[] }>()
);

export const SetPopularFixtures = createAction(
  '[Betting] SetPopularFixtures',
  props<{ popularFixtures: SortedEvents }>()
);

export const SetTicket = createAction(
  '[Betting] SetTicket',
  props<{ ticket: Ticket }>()
);

export const SelectMatch = createAction(
  '[Betting] SelectMatch',
  props<{ market: Event }>()
);

export const SetSpecialMarkets = createAction(
  '[Betting] SetSpecialMarkets',
  props<{ specialMarkets: SpecialMarkets }>()
);

export const ChangeSport = createAction(
  '[Betting] ChangeSport',
  props<{ sport_id: number }>()
);

export const FilterByTime = createAction(
  '[Betting] FilterByTime',
  props<{ start: Date; end: Date }>()
);

export const RemoveFilter = createAction('[Betting] RemoveFilter');
