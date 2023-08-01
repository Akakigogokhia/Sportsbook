import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../../../store/app.reducer';
import * as BetslipSelectors from '../store/betslip.selectors';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select(BetslipSelectors.ticketSelector).subscribe;
  }
}
