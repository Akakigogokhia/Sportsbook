import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDecimalPipe } from './pipes/format-decimal.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { HeaderComponent } from '../components/header/header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormatDecimalPipe, FormatDatePipe, HeaderComponent],
  imports: [CommonModule, FormsModule],
  exports: [
    FormsModule,
    FormatDatePipe,
    HeaderComponent,
    FormatDatePipe,
    FormatDecimalPipe,
  ],
})
export class SharedModule {}
