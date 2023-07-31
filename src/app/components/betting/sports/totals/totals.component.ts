import { Component, Input, OnInit } from '@angular/core';
import { Totals } from 'src/app/shared/models/market.model';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss'],
})
export class TotalsComponent implements OnInit {
  @Input() totals: Totals;
  @Input() total: string;

  ngOnInit(): void {}
}
