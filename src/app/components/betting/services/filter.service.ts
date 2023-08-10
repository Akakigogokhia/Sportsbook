import { Injectable } from '@angular/core';
import { SortedEvents } from 'src/app/shared/models/betting.models';
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

  searchFixtures = (searchWord: string, allFixtures: SortedEvents) => {
    return allFixtures?.map(([key, fixturesArr]) => {
      const fixtures = fixturesArr.filter((fixture) =>
        ((fixture.home ?? '') + (fixture.away ?? ''))
          .toLowerCase()
          .includes(searchWord.toLowerCase())
      );
      return [key, fixtures];
    });
  };
}
