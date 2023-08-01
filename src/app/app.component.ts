import { Component, OnInit } from '@angular/core';
import { Event } from './shared/models/market.model';
import { Store } from '@ngrx/store';
import * as FromApp from './store/app.reducer';
import * as BettingActions from './components/betting/store/betting.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  events: Event[];
  constructor(private store: Store<FromApp.AppState>, private router: Router) {}

  fetch() {
    this.store.dispatch(BettingActions.FetchFixtures({ sport_id: 1 }));
    this.router.navigate(['/popular']);
  }

  ngOnInit(): void {}
}
