import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Event, MarketResponse } from 'src/app/shared/models/market.model';
import {
  SpecialMarkets,
  SpecialMarketResponse,
} from 'src/app/shared/models/specialMarket.model';

@Injectable({
  providedIn: 'root',
})
export class BettingService {
  events: Event[];

  makeApiRequest(sport_id: number = 1): Observable<MarketResponse> {
    const url = `https://pinnacle-odds.p.rapidapi.com/kit/v1/markets?sport_id=${sport_id}&is_have_odds=true`;

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '75b0d7f53fmsh41383450bdaffc3p1ac0a3jsn2217b579f5c7',
      'X-RapidAPI-Host': 'pinnacle-odds.p.rapidapi.com',
    });

    const options = { headers: headers };

    return this.http.get<MarketResponse>(url, options);
  }

  getSpecialMarkets(event_id: number) {
    const url = 'https://pinnacle-odds.p.rapidapi.com/kit/v1/special-markets';
    const options = {
      params: {
        sport_id: 1,
        is_have_odds: 'true',
        event_ids: event_id,
      },
      headers: {
        'X-RapidAPI-Key': '75b0d7f53fmsh41383450bdaffc3p1ac0a3jsn2217b579f5c7',
        'X-RapidAPI-Host': 'pinnacle-odds.p.rapidapi.com',
      },
    };
    return this.http.get<SpecialMarketResponse>(url, options);
  }

  constructor(private http: HttpClient) {}
}
