import { Injectable } from '@angular/core';

export interface League {
  [leagueId: string]: LeagueDesc;
}

export interface LeagueDesc {
  name: string;
  logoUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class Constants {
  leagues: League = {
    '1728': {
      name: 'Sweden - Allsvenskan',
      logoUrl: '',
    },
    '1742': {
      name: 'Armenia - Premier League',
      logoUrl: '',
    },
    '1792': {
      name: 'Austria - Bundesliga',
      logoUrl: '',
    },
    '1817': {
      name: 'Belgium - Pro League',
      logoUrl: '',
    },
    '1834': {
      name: 'Brazil - Serie A',
      logoUrl: '',
    },
    '1842': {
      name: 'Germany - Bundesliga',
      logoUrl: '',
    },
    '1843': {
      name: 'Germany - Bundesliga 2',
      logoUrl: '',
    },
    '1928': {
      name: 'Netherlands - Eredivisie',
      logoUrl: '',
    },
    '1977': {
      name: 'England - Championship',
      logoUrl: '',
    },
    '1980': {
      name: 'England - Premier League',
      logoUrl: '',
    },
    '1982': {
      name: 'England - EFL Cup',
      logoUrl: '',
    },
    '2018': {
      name: 'Finland - Kakkonen',
      logoUrl: '',
    },
    '2024': {
      name: 'Finland - Veikkausliiga',
      logoUrl: '',
    },
    '2036': {
      name: 'France - Ligue 1',
      logoUrl: '',
    },
    '2037': {
      name: 'France - Ligue 2',
      logoUrl: '',
    },
    '2065': {
      name: 'Germany - Oberliga Bayern Nord',
      logoUrl: '',
    },
    '2157': {
      name: 'Japan - J League',
      logoUrl: '',
    },
    '2196': {
      name: 'Spain - La Liga',
      logoUrl: '',
    },
    '2331': {
      name: 'Norway - 1st Division',
      logoUrl: '',
    },
    '2374': {
      name: 'Poland - Ekstraklasa',
      logoUrl: '',
    },
    '2436': {
      name: 'Italy - Serie A',
      logoUrl: '',
    },
    '2627': {
      name: 'UEFA - Champions League',
      logoUrl: '',
    },
    '2650': {
      name: 'Ukraine - Premier League',
      logoUrl: '',
    },
    '2687': {
      name: 'FIFA - World Cup Women',
      logoUrl: '',
    },
    '6417': {
      name: 'China - Super League',
      logoUrl: '',
    },
    '210697': {
      name: 'Argentina - Liga Pro',
      logoUrl: '',
    },
  };

  popularLeagues = [
    '2627',
    '2630',
    '214101',
    '1980',
    '2436',
    '1842',
    '2196',
    '2036',
    '1928',
    '2687',
    '1817',
    '1843',
    '2386',
    '1982',
    '1977',
    '1792',
    '1728',
    '1742',
    '1834',
    '2374',
    '2650',
    '2018',
    '6417',
    '2037',
    '210697',
    '2065',
    '2157',
    '2331',
    '2024',
  ];
  popularBasketballLeagues = [
    '397',
    '4492',
    '487',
    '375',
    '578',
    '382',
    '423',
    '472',
    '214222',
  ];
}
