import { createAction, props } from '@ngrx/store';

export const Login = createAction(
  '[Auth] Login',
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const LoginStart = createAction(
  '[Auth] LoginStart',
  props<{
    email: string;
    password: string;
  }>()
);

export const SignupStart = createAction(
  '[Auth] SignupStart',
  props<{
    email: string;
    password: string;
  }>()
);

export const LoginFail = createAction(
  '[Auth] LoginFail',
  props<{ error: string }>()
);

export const Logout = createAction('[Auth] Logout');

export const AutoLogin = createAction('[Auth] CheckUser');
