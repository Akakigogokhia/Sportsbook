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
      logoUrl: 'images/allsvenskan.jpg',
    },
    '1742': {
      name: 'Armenia - Premier League',
      logoUrl: 'images/armenia.jpg',
    },
    '1792': {
      name: 'Austria - Bundesliga',
      logoUrl: 'images/austria-bundesliga.png',
    },
    '1817': {
      name: 'Belgium - Pro League',
      logoUrl: 'images/belgium-pro-league.png',
    },
    '1834': {
      name: 'Brazil - Serie A',
      logoUrl: 'images/brazil-serie-a.png',
    },
    '1842': {
      name: 'Germany - Bundesliga',
      logoUrl: 'images/bundesliga.png',
    },
    '1843': {
      name: 'Germany - Bundesliga 2',
      logoUrl: 'images/bundesliga2.png',
    },
    '1928': {
      name: 'Netherlands - Eredivisie',
      logoUrl: 'images/eredivisie.png',
    },
    '1977': {
      name: 'England - Championship',
      logoUrl: 'images/efl.png',
    },
    '1980': {
      name: 'England - Premier League',
      logoUrl: 'images/premiere-league.png',
    },
    '1982': {
      name: 'England - EFL Cup',
      logoUrl: 'images/efl-cup.jpg',
    },
    '2018': {
      name: 'Finland - Kakkonen',
      logoUrl: 'images/finland-kkk.jpg',
    },
    '2036': {
      name: 'France - Ligue 1',
      logoUrl: 'images/league1.png',
    },
    '2037': {
      name: 'France - Ligue 2',
      logoUrl: 'images/league2.png',
    },
    '2065': {
      name: 'Germany - Oberliga Bayern Nord',
      logoUrl: 'images/oberliga.png',
    },
    '2157': {
      name: 'Japan - J League',
      logoUrl: 'images/j-league.png',
    },
    '2196': {
      name: 'Spain - La Liga',
      logoUrl: 'images/laliga.png',
    },
    '2331': {
      name: 'Norway - 1st Division',
      logoUrl: 'images/norway1st.png',
    },
    '2374': {
      name: 'Poland - Ekstraklasa',
      logoUrl: 'images/poland.jpg',
    },
    '2436': {
      name: 'Italy - Serie A',
      logoUrl: '',
    },
    '2627': {
      name: 'UEFA - Champions League',
      logoUrl: 'images/ucl.png',
    },
    '2650': {
      name: 'Ukraine - Premier League',
      logoUrl: 'images/ukraine.png',
    },
    '2687': {
      name: 'FIFA - World Cup Women',
      logoUrl: 'images/woman-world-cup.jpg',
    },
    '6417': {
      name: 'China - Super League',
      logoUrl: 'images/csl.png',
    },
    '210697': {
      name: 'Argentina - Liga Pro',
      logoUrl: 'images/argentina.png',
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
