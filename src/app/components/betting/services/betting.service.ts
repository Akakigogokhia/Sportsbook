import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Event, MarketResponse } from 'src/app/shared/models/response.models';

@Injectable({
  providedIn: 'root',
})
export class BettingService {
  events: Event[];

  makeApiRequest(): Observable<MarketResponse> {
    const url =
      'https://pinnacle-odds.p.rapidapi.com/kit/v1/markets?sport_id=1&is_have_odds=true';

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '244069d56cmshab8b2bb779ff79dp194954jsn16afcb16b9b3',
      'X-RapidAPI-Host': 'pinnacle-odds.p.rapidapi.com',
    });

    const options = { headers: headers };

    return this.http.get<MarketResponse>(url, options);
  }

  constructor(private http: HttpClient) {}
}
