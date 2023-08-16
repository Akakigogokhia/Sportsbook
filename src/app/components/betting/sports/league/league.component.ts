import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/models/market.model';
import { Constants, League } from 'src/app/shared/services/constants.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
})
export class LeagueComponent implements OnInit {
  @Input() leagueId: string;
  @Input() events: Event[];
  @Input() sportId: number;

  leagues: League;
  leagueName: string;
  leagueLogo: string;

  constructor(private constants: Constants, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.leagues = this.constants.leagues;
    this.leagueName = this.events[0].league_name;
    this.leagueLogo = this.leagues[this.leagueId]?.logoUrl;
    if (!this.leagueLogo) {
      if (this.sportId === 1)
        this.leagueLogo = 'assets/images/icons/league_1.png';
      else if (this.sportId === 2)
        this.leagueLogo = 'assets/images/icons/league_2.png';
      else if (this.sportId === 3)
        this.leagueLogo = 'assets/images/icons/league_3.png';
    }
  }
}
