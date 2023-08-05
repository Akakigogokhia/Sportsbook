import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as BetslipActions from '../store/betslip.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Event, PreiodResult } from 'src/app/shared/models/market.model';
import { Bet } from 'src/app/shared/models/betting.models';

@Injectable({
  providedIn: 'root',
})
export class BetsliptService {
  constructor(private store: Store<AppState>, private http: HttpClient) {}
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
    this.store.dispatch(
      BetslipActions.AddBet({
        bet: {
          event_id: id,
          home: home,
          away: away,
          date: starts,
          bet_type: bet_type,
          position: position,
          odd: odd,
          firstHalf: firstHalf,
          status: null,
        },
      })
    );
  };

  betStatusCall = (event_id: number) => {
    const url = `https://pinnacle-odds.p.rapidapi.com/kit/v1/details?event_id=${event_id}`;
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': environment.rapidApiKey,
      'X-RapidAPI-Host': 'pinnacle-odds.p.rapidapi.com',
    });
    return this.http.get<{ event: Event }>(url, { headers: headers });
  };

  checkBetStatus = (bet: Bet, period_results: PreiodResult[]) => {
    const lastIndex = period_results.length - 1;
    const result = bet.firstHalf
      ? {
          home: period_results[1].team_1_score,
          away: period_results[1].team_2_score,
        }
      : {
          home: period_results[lastIndex].team_1_score,
          away: period_results[lastIndex].team_2_score,
        };
    if (bet.bet_type === 'Main Line') {
      if (bet.position === '1') return result.home > result.away;
      else if (bet.position === 'X') return result.home === result.away;
      else return result.home < result.away;
    } else if (bet.bet_type === 'Double Chance') {
      if (bet.position === '1X') return result.home >= result.away;
      else if (bet.position === '12')
        return result.home > result.away || result.home < result.away;
      else return result.home <= result.away;
    } else if (typeof bet.bet_type === 'number') {
      if (bet.position === 'over') {
        return +bet.bet_type >= result.home + result.away;
      } else if (bet.position === 'under') {
        return +bet.bet_type <= result.home + result.away;
      } else if (bet.position === '1') {
        return result.home + +bet.bet_type > result.away;
      } else return result.home < result.away + +bet.bet_type;
    } else {
      return false;
    }
  };
}
