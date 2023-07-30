import { createReducer, on } from '@ngrx/store';
import {
  GroupedEvents,
  SortedEvents,
  Ticket,
} from 'src/app/shared/models/betting.models';
import * as BettingActions from './betting.actions';
import { Event } from 'src/app/shared/models/response.models';

export interface State {
  footballAll: Event[] | null;
  footballPopular: SortedEvents;
  basketBallAll: Event[] | null;
  basketBallPopular: GroupedEvents | null;
  tennisAll: Event[] | null;
  tennisPopular: GroupedEvents | null;
  market: Event | null;
  activeTicket: Ticket | null;
  ticketHistory: Ticket[] | null;
}

const initialState: State = {
  footballAll: null,
  footballPopular: null,
  basketBallAll: null,
  basketBallPopular: null,
  tennisAll: null,
  tennisPopular: null,
  market: null,
  activeTicket: null,
  ticketHistory: null,
};

export const BettingReducer = createReducer(
  initialState,
  on(BettingActions.SetFixtures, (state, action) => ({
    ...state,
    footballAll: action.allFixtures,
  })),
  on(BettingActions.SetPopularFixtures, (state, action) => ({
    ...state,
    footballPopular: action.popularFixtures,
  }))
);
