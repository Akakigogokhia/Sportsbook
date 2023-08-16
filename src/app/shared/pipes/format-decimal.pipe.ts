import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDecimal',
})
export class FormatDecimalPipe implements PipeTransform {
  transform(num: number | string | undefined): string {
    if (num || num === 0) return (+num).toFixed(2);
    return '';
  }
}
