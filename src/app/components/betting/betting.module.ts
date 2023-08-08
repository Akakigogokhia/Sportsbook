import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopFixturesComponent } from './sports/top-fixtures/top-fixtures.component';
import { LeagueComponent } from './sports/league/league.component';
import { MatchPreviewComponent } from './sports/match-preview/match-preview.component';
import { TotalsComponent } from './sports/totals/totals.component';
import { MatchDetailComponent } from './sports/match-detail/match-detail.component';
import { AllOddsComponent } from './sports/match-detail/all-odds/all-odds.component';
import { PeriodComponent } from './sports/match-detail/period/period.component';
import { SpecialMarketsComponent } from './sports/match-detail/special-markets/special-markets.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TopFixturesComponent,
    LeagueComponent,
    MatchPreviewComponent,
    TotalsComponent,
    MatchDetailComponent,
    AllOddsComponent,
    SpecialMarketsComponent,
    PeriodComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class BettingModule {}
