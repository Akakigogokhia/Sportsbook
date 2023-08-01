import { ActionReducerMap } from '@ngrx/store';
import * as FromAuth from '../components/auth/store/auth.reducer';
import * as FromBetting from '../components/betting/store/betting.reducer';
import * as FromBetslip from '../components/betslip/store/betslip.reducer';

export interface AppState {
  auth: FromAuth.State;
  betting: FromBetting.State;
  betslip: FromBetslip.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  auth: FromAuth.AuthReducer,
  betting: FromBetting.BettingReducer,
  betslip: FromBetslip.BetslipReducer,
};
