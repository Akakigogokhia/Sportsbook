import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event, MarketResponse } from './shared/models/response.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  events: Event[];
  constructor(private http: HttpClient) {}

  makeApiRequest() {
    const url =
      'https://pinnacle-odds.p.rapidapi.com/kit/v1/markets?sport_id=1&is_have_odds=true&league_ids=2436';

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '244069d56cmshab8b2bb779ff79dp194954jsn16afcb16b9b3',
      'X-RapidAPI-Host': 'pinnacle-odds.p.rapidapi.com',
    });

    const options = { headers: headers };

    this.http.get<MarketResponse>(url, options).subscribe((response) => {
      console.log(response);
      this.events = response.events.filter((event: Event) => {
        return !event.league_name.includes('Corners');
      });
    });
  }
}
