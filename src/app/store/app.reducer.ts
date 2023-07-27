import { ActionReducerMap } from '@ngrx/store';
import * as FromAuth from '../components/auth/store/auth.reducer';
import * as FromBetting from '../components/betting/store/betting.reducer';

export interface AppState {
  auth: FromAuth.State;
  betting: FromBetting.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  auth: FromAuth.AuthReducer,
  betting: FromBetting.BettingReducer,
};
