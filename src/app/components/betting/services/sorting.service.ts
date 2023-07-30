import { Injectable } from '@angular/core';
import {
  GroupedEvents,
  SortedEvents,
} from 'src/app/shared/models/betting.models';
import { Event } from 'src/app/shared/models/response.models';
import { Constants } from 'src/app/shared/services/constants.service';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  constructor(private constants: Constants, private dateService: DateService) {}

  sortByPopularity = (fixtures: Event[]) => {
    fixtures = this.dateService.filterStarted(fixtures);
    fixtures.sort(
      (a: Event, b: Event) =>
        new Date(a.starts).getTime() - new Date(b.starts).getTime()
    );

    const groupedByLeagueId: GroupedEvents = {};
    fixtures.forEach((fixture) => {
      const id = fixture.league_id;
      groupedByLeagueId[id] = groupedByLeagueId[id] || [];

      if (fixture.event_type === 'prematch')
        groupedByLeagueId[id].push(fixture);
    });

    const filteredLeagueIds = Object.keys(groupedByLeagueId).filter((id) =>
      this.constants.popularLeagues.includes(id)
    );

    const sortedLeagueIds = filteredLeagueIds.sort((a, b) => {
      const firstIndex = this.constants.popularLeagues.indexOf(a);
      const secondIndex = this.constants.popularLeagues.indexOf(b);
      const firstDate = this.dateService.convertTimezone(
        new Date(groupedByLeagueId[a][0].starts)
      );
      const secondDate = this.dateService.convertTimezone(
        new Date(groupedByLeagueId[b][0].starts)
      );

      const firstToday = this.dateService.isToday(firstDate);
      const secondToday = this.dateService.isToday(secondDate);

      if (firstToday && !secondToday) {
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
