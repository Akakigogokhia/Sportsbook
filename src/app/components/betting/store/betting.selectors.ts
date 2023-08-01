import { AppState } from 'src/app/store/app.reducer';

export const selectActiveFixtures = (state: AppState) =>
  state.betting.activeFixtures;

export const selectSportId = (state: AppState) => state.betting.sport_id;

export const selectMarket = (state: AppState) => state.betting.activeMarket;

export const specialMarket = (state: AppState) =>
  state.betting.activeSpecialMarket;
