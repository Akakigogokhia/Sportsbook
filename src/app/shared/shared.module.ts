import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDecimalPipe } from './pipes/format-decimal.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { HeaderComponent } from '../components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopFixturesComponent } from '../components/betting/sports/top-fixtures/top-fixtures.component';
import { TicketsComponent } from '../components/betslip/tickets/tickets.component';
import { BetslipComponent } from '../components/betslip/tickets/betslip/betslip.component';
import { LeagueComponent } from '../components/betting/sports/league/league.component';
import { MatchPreviewComponent } from '../components/betting/sports/match-preview/match-preview.component';
import { TotalsComponent } from '../components/betting/sports/totals/totals.component';
import { TicketComponent } from '../components/betslip/ticket/ticket.component';
import { BetComponent } from '../components/betslip/bet/bet.component';

@NgModule({
  declarations: [
    FormatDecimalPipe,
    FormatDatePipe,
    HeaderComponent,
    TopFixturesComponent,
    TicketsComponent,
    BetslipComponent,
    LeagueComponent,
    MatchPreviewComponent,
    TotalsComponent,
    TicketComponent,
    BetComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FormatDatePipe,
    HeaderComponent,
    FormatDatePipe,
    FormatDecimalPipe,
    TopFixturesComponent,
    TicketsComponent,
    BetslipComponent,
    LeagueComponent,
    MatchPreviewComponent,
    TotalsComponent,
    TicketComponent,
    BetComponent,
  ],
})
export class SharedModule {}
