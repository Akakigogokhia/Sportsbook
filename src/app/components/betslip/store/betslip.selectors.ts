import { AppState } from 'src/app/store/app.reducer';

export const ticketSelector = (state: AppState) => state.betslip.ticket;
