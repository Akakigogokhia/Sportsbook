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
      logoUrl: 'assets/images/leagues/allsvenskan.jpg',
    },
    '1742': {
      name: 'Armenia - Premier League',
      logoUrl: 'assets/images/leagues/armenia.jpg',
    },
    '1792': {
      name: 'Austria - Bundesliga',
      logoUrl: 'assets/images/leagues/austria-bundesliga.png',
    },
    '1817': {
      name: 'Belgium - Pro League',
      logoUrl: 'assets/images/leagues/belgium-pro-league.png',
    },
    '1834': {
      name: 'Brazil - Serie A',
      logoUrl: 'assets/images/leagues/brazil-serie-a.png',
    },
    '1842': {
      name: 'Germany - Bundesliga',
      logoUrl: 'assets/images/leagues/bundesliga.png',
    },
    '1843': {
      name: 'Germany - Bundesliga 2',
      logoUrl: 'assets/images/leagues/bundesliga2.png',
    },
    '1928': {
      name: 'Netherlands - Eredivisie',
      logoUrl: 'assets/images/leagues/eredivisie.png',
    },
    '1977': {
      name: 'England - Championship',
      logoUrl: 'assets/images/leagues/efl.png',
    },
    '1980': {
      name: 'England - Premier League',
      logoUrl: 'assets/images/leagues/premier-league.png',
    },
    '1982': {
      name: 'England - EFL Cup',
      logoUrl: 'assets/images/leagues/efl-cup.jpg',
    },
    '2018': {
      name: 'Finland - Kakkonen',
      logoUrl: 'assets/images/leagues/finland-kkk.jpg',
    },
    '2036': {
      name: 'France - Ligue 1',
      logoUrl: 'assets/images/leagues/league1.png',
    },
    '2037': {
      name: 'France - Ligue 2',
      logoUrl: 'assets/images/leagues/league2.png',
    },
    '2065': {
      name: 'Germany - Oberliga Bayern Nord',
      logoUrl: 'assets/images/leagues/oberliga.png',
    },
    '2157': {
      name: 'Japan - J League',
      logoUrl: 'assets/images/leagues/j-league.png',
    },
    '2196': {
      name: 'Spain - La Liga',
      logoUrl: 'assets/images/leagues/laliga.png',
    },
    '2331': {
      name: 'Norway - 1st Division',
      logoUrl: 'assets/images/leagues/norway1st.png',
    },
    '2374': {
      name: 'Poland - Ekstraklasa',
      logoUrl: 'assets/images/leagues/poland.jpg',
    },
    '2436': {
      name: 'Italy - Serie A',
      logoUrl: 'assets/images/leagues/seria-a.png',
    },
    '2627': {
      name: 'UEFA - Champions League',
      logoUrl: 'assets/images/leagues/ucl.png',
    },
    '2650': {
      name: 'Ukraine - Premier League',
      logoUrl: 'assets/images/leagues/ukraine.png',
    },
    '2687': {
      name: 'FIFA - World Cup Women',
      logoUrl: 'assets/images/leagues/woman-world-cup.jpg',
    },
    '2386': {
      name: 'Portugal - Primeira Liga',
      logoUrl: 'assets/images/leagues/portugal.png',
    },
    '6417': {
      name: 'China - Super League',
      logoUrl: 'assets/images/leagues/csl.png',
    },
    '210697': {
      name: 'Argentina - Liga Pro',
      logoUrl: 'assets/images/leagues/argentina.png',
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
