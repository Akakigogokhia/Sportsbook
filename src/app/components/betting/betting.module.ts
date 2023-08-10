import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchDetailComponent } from './sports/match-detail/match-detail.component';
import { AllOddsComponent } from './sports/match-detail/all-odds/all-odds.component';
import { PeriodComponent } from './sports/match-detail/period/period.component';
import { SpecialMarketsComponent } from './sports/match-detail/special-markets/special-markets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BettingRoutingModule } from './betting-routing.module';
import { FixtureComponent } from './fixture/fixture.component';

@NgModule({
  declarations: [
    MatchDetailComponent,
    AllOddsComponent,
    SpecialMarketsComponent,
    PeriodComponent,
    FixtureComponent,
  ],
  imports: [CommonModule, SharedModule, BettingRoutingModule],
})
export class BettingModule {}
