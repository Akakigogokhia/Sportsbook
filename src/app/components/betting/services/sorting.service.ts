import { Injectable } from '@angular/core';
import {
  GroupedEvents,
  SortedEvents,
} from 'src/app/shared/models/betting.models';
import { Event } from 'src/app/shared/models/market.model';
import { Constants } from 'src/app/shared/services/constants.service';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  constructor(private constants: Constants, private dateService: DateService) {}

  groupFixturesByLeagueId = (fixtures: Event[]) => {
    const leagueOrder: string[] = [];
    const groupedByLeagueId = fixtures.reduce((grouped, fixture) => {
      const { league_id, event_type } = fixture;
      if (
        event_type === 'prematch' &&
        fixture.periods?.num_0.money_line?.home
      ) {
        if (!grouped[league_id]) {
          grouped[league_id] = [];
          leagueOrder.push(league_id);
        }

        grouped[league_id].push(fixture);
      }

      return grouped;
    }, {} as GroupedEvents);

    return { groupedByLeagueId, leagueOrder };
  };

  groupFixturesInOrder = (
    groupedFixtues: GroupedEvents,
    leagueOrder: string[]
  ) => {
    const groupedByOrder: SortedEvents = leagueOrder.map((id) => [
      id,
      groupedFixtues[id],
    ]);

    return groupedByOrder;
  };

  sortTennisFixtures(fixtures: Event[]) {
    const { groupedByLeagueId, leagueOrder } =
      this.groupFixturesByLeagueId(fixtures);
    return this.groupFixturesInOrder(groupedByLeagueId, leagueOrder);
  }

  sortFixtures = (fixtures: Event[], sport_id: number) => {
    fixtures = this.dateService.filterStarted(fixtures);

    const { groupedByLeagueId } = this.groupFixturesByLeagueId(fixtures);
    const popularLeagues =
      sport_id === 1
        ? this.constants.popularLeagues
        : this.constants.popularBasketballLeagues;

    const filteredLeagueIds =
      sport_id === 1
        ? Object.keys(groupedByLeagueId).filter((id) =>
            popularLeagues.includes(id)
          )
        : Object.keys(groupedByLeagueId);

    const sortedLeagueIds = filteredLeagueIds.sort((a, b) => {
      const firstIndex = popularLeagues.indexOf(a);
      const secondIndex = popularLeagues.indexOf(b);
      const firstDate = this.dateService.convertTimezone(
        new Date(groupedByLeagueId[a][0].starts)
      );
      const secondDate = this.dateService.convertTimezone(
        new Date(groupedByLeagueId[b][0].starts)
      );

      const firstToday = this.dateService.isSameDate(firstDate);
      const secondToday = this.dateService.isSameDate(secondDate);

      if (firstIndex === -1 && secondIndex === -1) {
        return 0;
      } else if (firstIndex === -1) {
        return 1;
      } else if (secondIndex === -1) {
        return -1;
      } else if (firstToday && !secondToday) {
        return -1;
      } else if (!firstToday && secondToday) {
        return 1;
      } else if (!firstToday && !secondToday) {
        return firstDate.getTime() - secondDate.getTime();
      }

      return firstIndex - secondIndex;
    });

    const sortedEvents: SortedEvents = sortedLeagueIds.map((id) => [
      id,
      groupedByLeagueId[id],
    ]);

    return sortedEvents;
  };
}
