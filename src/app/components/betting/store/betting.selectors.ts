import { AppState } from 'src/app/store/app.reducer';

export const selectPopularFixtures = (state: AppState) =>
  state.betting.footballPopular;
