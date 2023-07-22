import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDecimal',
})
export class FormatDecimalPipe implements PipeTransform {
  transform(num: number): string {
    return num.toFixed(2);
  }
}
