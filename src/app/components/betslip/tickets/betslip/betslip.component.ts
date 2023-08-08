import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/shared/models/betting.models';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.scss'],
})
export class BetslipComponent {
  @Input() betslip: Ticket;
}
