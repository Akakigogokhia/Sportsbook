import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(FromApp.AppReducer),
    EffectsModule.forRoot([AuthEffects, BettingEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
