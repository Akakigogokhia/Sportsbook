import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OddsService {
  doubleChance(home: number, draw: number, away: number) {
    const homeOrDraw =
      1 / (1 / home + 1 / draw) < 1.01
        ? '-'
        : (1 / (1 / home + 1 / draw)).toFixed(2);
    const homeOrAway =
      1 / (1 / home + 1 / away) < 1.01
        ? '-'
        : (1 / (1 / home + 1 / away)).toFixed(2);
    const drawOrAway =
      1 / (1 / away + 1 / draw) < 1.01
        ? '-'
        : (1 / (1 / away + 1 / draw)).toFixed(2);

    return {
      homeOrDraw,
      homeOrAway,
      drawOrAway,
    };
  }

  convertOddsAndTimezone(value: any, key: string): any {
    if (typeof value === 'number') {
      return value.toFixed(2);
    } else if (key === 'starts') {
      return new Date(value).getTime() + 4 * 60 * 60 * 1000;
    } else if (typeof value === 'object' && value !== null) {
      const formattedObj: any = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          formattedObj[key] = this.convertOddsAndTimezone(value[key], key);
        }
      }
      return formattedObj;
    }
    return value;
  }
}
