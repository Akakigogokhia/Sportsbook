export interface Ticket {
  id: string;
  bets: Bet[];
  total_stake: number;
  total_odd: number;
  potential_payout: number;
  timestamp: Date;
}

export interface Bet {
  event_id: number;
  home: string;
  away: string;
  date: string;
  bet_type: string;
  position: string;
  odd: number;
}
