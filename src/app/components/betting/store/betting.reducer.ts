import { createReducer, on } from '@ngrx/store';
import { SortedEvents, Ticket } from 'src/app/shared/models/betting.models';
import * as BettingActions from './betting.actions';
import { Event } from 'src/app/shared/models/market.model';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';

export interface State {
  sport_id: number | null;
  activeFixtures: SortedEvents;
  footballPopular: SortedEvents;
  basketBallPopular: SortedEvents;
  tennisPopular: SortedEvents;
  activeMarket: Event | null;
  activeSpecialMarket: SpecialMarkets | null;
  activeTicket: Ticket | null;
  ticketHistory: Ticket[] | null;
}

const initialState: State = {
  sport_id: null,
  activeFixtures: null,
  footballPopular: null,
  basketBallPopular: null,
  tennisPopular: null,
  activeMarket: null,
  activeSpecialMarket: null,
  activeTicket: null,
  ticketHistory: null,
};

export const BettingReducer = createReducer(
  initialState,
  on(BettingActions.SetFixtures, (state, action) => ({
    ...state,
    footballAll: action.allFixtures,
  })),
  on(BettingActions.SetPopularFixtures, (state, action) => {
    switch (state.sport_id) {
      case 1:
        return {
          ...state,
          footballPopular: action.popularFixtures,
          activeFixtures: action.popularFixtures,
        };
        break;
      case 2:
        return {
          ...state,
          tennisPopular: action.popularFixtures,
          activeFixtures: action.popularFixtures,
        };
      case 3:
        return {
          ...state,
          basketBallPopular: action.popularFixtures,
          activeFixtures: action.popularFixtures,
        };
        break;
      default:
        return { ...state, footballPopular: action.popularFixtures };
        break;
    }
  }),
  on(BettingActions.FetchFixtures, (state, action) => ({
    ...state,
    sport_id: action.sport_id,
  })),
  on(BettingActions.SelectMatch, (state, action) => ({
    ...state,
    activeMarket: action.market,
  })),
  on(BettingActions.SetSpecialMarkets, (state, action) => ({
    ...state,
    activeSpecialMarket: action.specialMarkets,
  }))
);
