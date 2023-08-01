import { Injectable } from '@angular/core';
import { SpecialMarkets } from 'src/app/shared/models/specialMarket.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  getFirstHalfOdds = (specialMarkets: SpecialMarkets) => {
    return specialMarkets.filter((market) => market.name.includes('1st'));
  };

  getGoalOdds = (specialMarkets: SpecialMarkets) => {
    return specialMarkets.filter(
      (market) => market.name.includes('Goal') || market.name.includes('Both')
    );
  };
}
