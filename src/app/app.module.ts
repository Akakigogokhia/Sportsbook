import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as FromApp from './store/app.reducer';
import { AuthEffects } from './components/auth/store/auth.effects';
import { AppRoutingModule } from './app-routing.module';
import { BettingEffects } from './components/betting/store/betting.effects';
import { BetslipEffects } from './components/betslip/store/betslip.effects';
import { BettingModule } from './components/betting/betting.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(FromApp.AppReducer),
    EffectsModule.forRoot([AuthEffects, BettingEffects, BetslipEffects]),
    BettingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
