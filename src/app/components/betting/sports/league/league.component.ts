import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/models/response.models';
import { Constants, League } from 'src/app/shared/services/constants.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
})
export class LeagueComponent implements OnInit {
  @Input() leagueId: string;
  @Input() events: Event[];

  leagues: League;

  constructor(private constants: Constants) {}

  ngOnInit(): void {
    this.leagues = this.constants.leagues;
  }
}
