import { createReducer, on } from '@ngrx/store';
import { Ticket } from 'src/app/shared/models/betting.models';
import * as BettingActions from './betting.actions';
import { Event } from 'src/app/shared/models/response.models';

export interface State {
  allFixtures: Event[] | null;
  popularFixtures: Event[] | null;
  market: Event | null; //market for specific match
  activeTicket: Ticket | null;
  ticketHistory: Ticket[] | null;
}

const initialState: State = {
  allFixtures: null,
  popularFixtures: null,
  market: null,
  activeTicket: null,
  ticketHistory: null,
};

export const BettingReducer = createReducer(
  initialState,
  on(BettingActions.SetFixtures, (state, action) => ({
    ...state,
    allFixtures: action.allFixtures,
  })),
  on(BettingActions.SetPopularFixtures, (state, action) => ({
    ...state,
    popularFixtures: action.popularFixtures,
  }))
);
