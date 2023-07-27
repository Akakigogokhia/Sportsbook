import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './shared/models/response.models';
import { Store } from '@ngrx/store';
import * as FromApp from './store/app.reducer';
import * as BettingActions from './components/betting/store/betting.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  events: Event[];
  constructor(
    private store: Store<FromApp.AppState>,
    private http: HttpClient
  ) {}

  fetch() {
    this.store.dispatch(BettingActions.FetchFixtures());
  }
  url =
    'https://api-football-v1.p.rapidapi.com/v3/odds?league=2&season=2023&date=2023-07-25';
  options = {
    headers: {
      'X-RapidAPI-Key': '244069d56cmshab8b2bb779ff79dp194954jsn16afcb16b9b3',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };
  ngOnInit(): void {
    this.http
      .get(this.url, { headers: this.options.headers })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
