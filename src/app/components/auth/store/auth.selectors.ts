import { AppState } from 'src/app/store/app.reducer';

export const userSelector = (state: AppState) => state.auth.user;

export const tokenSelector = (state: AppState) => state.auth.user?.token;

export const userIdSelector = (state: AppState) => state.auth.user?.id;
