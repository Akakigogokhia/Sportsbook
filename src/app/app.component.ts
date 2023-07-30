import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './shared/models/response.models';
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
  constructor(
    private store: Store<FromApp.AppState>,
    private http: HttpClient,
    private router: Router
  ) {}

  fetch() {
    this.store.dispatch(BettingActions.FetchFixtures());
    this.router.navigate(['/popular']);
  }

  ngOnInit(): void {}
}
