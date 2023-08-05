import { createReducer, on } from '@ngrx/store';
import { Bet, Ticket } from 'src/app/shared/models/betting.models';
import * as BetslipActions from './betslip.actions';

export interface State {
  ticket: Ticket;
  ticketHistory: Ticket[];
  activeTickets: Ticket[];
}

const initialState: State = {
  ticket: {
    id: Math.random().toString(),
    bets: [],
    total_stake: 1,
    total_odd: 0,
    potential_payout: 0,
  },
  ticketHistory: [],
  activeTickets: [],
};

export const BetslipReducer = createReducer(
  initialState,
  on(BetslipActions.AddBet, (state, { bet }) => {
    let bets = state.ticket.bets;
    bets = bets.filter((activeBet) => activeBet.event_id !== bet.event_id);
    return {
      ...state,
      ticket: {
        ...state.ticket,
        bets: [...bets, bet],
      },
    };
  }),
  on(BetslipActions.ChangeBetAmount, (state, { betAmount }) => ({
    ...state,
    ticket: {
      ...state.ticket,
      total_stake: betAmount,
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
        total_odd: +total_odd.toFixed(2),
        potential_payout: +potential_payout.toFixed(2),
      },
    };
  }),
  on(BetslipActions.ClearTicket, (state) => ({
    ...state,
    ticket: {
      ...state.ticket,
      bets: [],
    },
  })),
  on(BetslipActions.PlaceTicket, (state, action) => ({
    ...state,
    activeTickets: [...state.activeTickets, action.ticket],
  }))
  // on(BetslipActions.SaveBetStatus, (state, action) => {
  //   let checkedBet: Bet
  //   let activeTicketsCopy = [...state.activeTickets]
  //   activeTicketsCopy.map(ticket => {
  //     let index = ticket.bets.findIndex(bet => bet.event_id === action.event_id)
  //     if (index) {
  //       ticket.bets[index].status =
  //     }
  //   })
  // })
);
