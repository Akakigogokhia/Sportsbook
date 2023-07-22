import { createReducer, on } from '@ngrx/store';
import { User } from '../auth.models';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean | null;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: null,
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.LoginStart, AuthActions.SignupStart, (state, action) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(AuthActions.Login, (state, action) => {
    const user = new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    );
    return {
      ...state,
      user: user,
      authError: null,
      loading: false,
    };
  }),
  on(AuthActions.Logout, (state, action) => ({
    ...state,
    user: null,
  })),
  on(AuthActions.LoginFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.error,
    loading: false,
  }))
);
