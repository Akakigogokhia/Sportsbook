import { createReducer, on } from '@ngrx/store';
import { Ticket } from 'src/app/shared/models/betting.models';
import * as BetslipActions from './betslip.actions';

export interface State {
  ticket: Ticket;
  ticketHistory: Ticket[] | null;
}

const initialState: State = {
  ticket: {
    id: Math.random().toString(),
    bets: [],
    total_stake: 1,
    total_odd: 0,
    potential_payout: 0,
  },
  ticketHistory: null,
};

export const BetslipReducer = createReducer(
  initialState,
  on(BetslipActions.AddBet, (state, { bet }) => {
    const bets = state.ticket.bets;
    bets.filter((activeBet) => activeBet.event_id !== bet.event_id);
    return {
      ...state,
      ticket: {
        ...state.ticket,
        bets: [...bets, bet],
      },
    };
  }),
  on(BetslipActions.ChangeBetAmount, (state, { amount }) => ({
    ...state,
    ticket: {
      ...state.ticket,
      total_stake: amount,
    },
  })),
  on(BetslipActions.CalculateTicket, (state) => {
    const total_odd = state.ticket.bets.reduce((odd, bet) => {
      return odd * bet.odd;
    }, 1);
    const potential_payout = total_odd * state.ticket.total_stake;
    return {
      ...state,
      ticket: {
        ...state.ticket,
        total_odd: total_odd,
        potential_payout: potential_payout,
      },
    };
  })
);
