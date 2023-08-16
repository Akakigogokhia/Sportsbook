import { createReducer, on } from '@ngrx/store';
import { Status, Ticket } from 'src/app/shared/models/betting.models';
import * as BetslipActions from './betslip.actions';

export interface State {
  ticket: Ticket;
  activeTickets: Ticket[];
  balance: number;
  error: string | null;
}

const initialState: State = {
  ticket: {
    id: Math.random().toString(),
    status: 'Pending',
    bets: [],
    total_stake: 1,
    total_odd: 0,
    potential_payout: 0,
  },
  activeTickets: [],
  balance: 100,
  error: null,
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
  on(BetslipActions.RemoveBet, (state, action) => {
    const updatedBets = state.ticket.bets.filter(
      (bet) => bet.id !== action.betId
    );
    return {
      ...state,
      ticket: {
        ...state.ticket,
        bets: [...updatedBets],
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
    activeTickets: state.activeTickets
      ? [action.ticket, ...state.activeTickets]
      : [action.ticket],
  })),
  on(BetslipActions.SaveBetStatus, (state, action) => {
    let amountToAdd: number = 0;
    const activeTicketsCopy = state.activeTickets.map((ticket) => {
      const updatedBets = ticket.bets.map((bet) => {
        if (bet.id === action.id) {
          return {
            ...bet,
            status: action.bet_status,
            results: action.results,
          };
        }
        return bet;
      });

      let ticketStatus: Status = 'Pending';
      if (updatedBets.some((bet) => bet.status === 'Lost')) {
        ticketStatus = 'Lost';
      } else if (updatedBets.every((bet) => bet.status === 'Won')) {
        ticketStatus = 'Won';
        amountToAdd += state.ticket.potential_payout;
      }
      return {
        ...ticket,
        bets: updatedBets,
        status: ticketStatus!,
      };
    });

    return {
      ...state,
      activeTickets: activeTicketsCopy,
      balance: state.balance + amountToAdd,
    };
  }),
  on(BetslipActions.LoadTicketsSuccess, (state, { tickets }) => ({
    ...state,
    activeTickets: tickets,
    error: null,
  })),
  on(BetslipActions.Fail, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(BetslipActions.SaveTicketSuccess, (state, action) => ({
    ...state,
    error: null,
  })),
  on(BetslipActions.AddBalance, (state, action) => ({
    ...state,
    balance: state.balance + action.amount,
  }))
);
