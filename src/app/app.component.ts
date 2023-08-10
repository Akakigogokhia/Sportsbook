import { Component, OnInit } from '@angular/core';
import { Event } from './shared/models/market.model';
import { Store } from '@ngrx/store';
import * as FromApp from './store/app.reducer';
import * as BettingActions from './components/betting/store/betting.actions';
import { Router } from '@angular/router';
import { selectSportId } from './components/betting/store/betting.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
