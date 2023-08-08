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
import { AppRoutingModule } from './app-routing.module';
import { BettingEffects } from './components/betting/store/betting.effects';
import { BetslipEffects } from './components/betslip/store/betslip.effects';
import { BetslipModule } from './components/betslip/betslip.module';
import { BettingModule } from './components/betting/betting.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, AuthComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(FromApp.AppReducer),
    EffectsModule.forRoot([AuthEffects, BettingEffects, BetslipEffects]),
    BetslipModule,
    BettingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
