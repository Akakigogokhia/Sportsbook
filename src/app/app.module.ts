import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as FromApp from './store/app.reducer';
import { AuthEffects } from './components/auth/store/auth.effects';
import { FormatDecimalPipe } from './shared/pipes/format-decimal.pipe';
import { AppRoutingModule } from './app-routing.module';
import { TopFixturesComponent } from './components/betting/sports/top-fixtures/top-fixtures.component';
import { BettingEffects } from './components/betting/store/betting.effects';
import { LeagueComponent } from './components/betting/sports/league/league.component';
import { MatchPreviewComponent } from './components/betting/sports/match-preview/match-preview.component';
import { FormatDatePipe } from './shared/pipes/format-date.pipe';
import { TotalsComponent } from './components/betting/sports/totals/totals.component';
import { MatchDetailComponent } from './components/betting/sports/match-detail/match-detail.component';
import { AllOddsComponent } from './components/betting/sports/match-detail/all-odds/all-odds.component';
import { SpecialMarketsComponent } from './components/betting/sports/match-detail/special-markets/special-markets.component';
import { PeriodComponent } from './components/betting/sports/match-detail/period/period.component';
import { BetslipEffects } from './components/betslip/store/betslip.effects';
import { TicketComponent } from './components/betslip/ticket/ticket.component';
import { HeaderComponent } from './components/header/header.component';
import { TicketsComponent } from './components/betslip/tickets/tickets.component';
import { BetslipComponent } from './components/betslip/tickets/betslip/betslip.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FormatDecimalPipe,
    TopFixturesComponent,
    LeagueComponent,
    MatchPreviewComponent,
    FormatDatePipe,
    TotalsComponent,
    MatchDetailComponent,
    AllOddsComponent,
    SpecialMarketsComponent,
    PeriodComponent,
    TicketComponent,
    HeaderComponent,
    TicketsComponent,
    BetslipComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(FromApp.AppReducer),
    EffectsModule.forRoot([AuthEffects, BettingEffects, BetslipEffects]),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
