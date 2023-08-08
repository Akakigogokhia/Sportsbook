import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { BetslipComponent } from './tickets/betslip/betslip.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TicketComponent, TicketsComponent, BetslipComponent],
  imports: [CommonModule, SharedModule],
})
export class BetslipModule {}
