export interface MarketResponse {
  events: Event[];
}

export interface Event {
  event_id: number;
  sport_id: number;
  league_id: number;
  league_name: string;
  starts: string;
  home: string;
  away: string;
  event_type: string;
  is_have_odds: boolean;
  periods?: Periods;
}

export interface Periods {
  num_0: Period;
  num_1: Period;
}

export interface Period {
  line_id: string;
  period_status: number;
  money_line?: HomeAway;
  spreads?: Spreads;
  totals?: Totals;
  team_total: {
    home: OverUnder;
    away: OverUnder;
  };
}

export interface Spreads {
  [spread: string]: HomeAway;
}

export interface HomeAway {
  home: number;
  away: number;
  draw?: number;
  hdp?: number;
}

export interface Totals {
  [point: string]: OverUnder;
}

export interface OverUnder {
  points: number;
  over: number;
  under: number;
}
