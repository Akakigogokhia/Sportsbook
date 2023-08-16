import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as BetslipActions from '../store/betslip.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Event, PeriodResult } from 'src/app/shared/models/market.model';
import { Bet, Ticket } from 'src/app/shared/models/betting.models';
import { oddsCheckerService } from './oddsChecker.service';

@Injectable({
  providedIn: 'root',
})
export class BetsliptService {
  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private oddsChecker: oddsCheckerService
  ) {}
  addBet = (
    id: number,
    home: string,
    away: string,
    starts: string,
    bet_type: string,
    position: string,
    odd: number,
    firstHalf: boolean = false
  ) => {
    if (new Date(starts).getTime() > new Date().getTime()) {
      this.store.dispatch(
        BetslipActions.AddBet({
          bet: {
            id: Math.random(),
            event_id: id,
            home: home,
            away: away,
            date: starts,
            bet_type: bet_type,
            position: position,
            odd: odd,
            firstHalf: firstHalf,
            status: 'Pending',
            results: [],
          },
        })
      );
    } else {
      this.store.dispatch(
        BetslipActions.Fail({ error: 'This match is no longer available!' })
      );
    }
  };

  betStatusCall = (event_id: number) => {
    const url = `https://pinnacle-odds.p.rapidapi.com/kit/v1/details?event_id=${event_id}`;
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': environment.rapidApiKey,
      'X-RapidAPI-Host': 'pinnacle-odds.p.rapidapi.com',
    });
    return this.http.get<{ events: Event[] }>(url, { headers: headers });
  };

  saveBalance = (userId: string, balance: number) => {
    return this.http.put(
      `https://sportsbook-1111-default-rtdb.firebaseio.com/${userId}/balance.json`,
      balance
    );
  };

  getBalance = (userId: string) => {
    return this.http.get<number>(
      `https://sportsbook-1111-default-rtdb.firebaseio.com/${userId}/balance.json`
    );
  };

  saveActiveTickets = (activeTickets: Ticket[], userId: string) => {
    return this.http.put(
      `https://sportsbook-1111-default-rtdb.firebaseio.com/${userId}/tickets.json`,
      activeTickets
    );
  };

  getActiveTickets = (userId: string) =>
    this.http.get<Ticket[]>(
      `https://sportsbook-1111-default-rtdb.firebaseio.com/${userId}/tickets.json`
    );

  sortPeriods = (period_results: PeriodResult[]) => {
    return period_results.sort(
      (a, b) =>
        b.team_1_score + b.team_2_score - (a.team_1_score + a.team_2_score)
    );
  };

  checkBetStatus = (bet: Bet, period_results: PeriodResult[]) => {
    const lastIndex = period_results.length - 1;
    period_results = this.sortPeriods(period_results);
    const result = bet.firstHalf
      ? {
          home: period_results[lastIndex].team_1_score,
          away: period_results[lastIndex].team_2_score,
        }
      : {
          home: period_results[0].team_1_score,
          away: period_results[0].team_2_score,
        };
    return this.oddsChecker.checkEvents(
      bet.home,
      bet.away,
      bet.bet_type,
      bet.position,
      period_results[lastIndex],
      period_results[0],
      result
    );
  };
}
