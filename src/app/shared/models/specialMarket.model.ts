export interface SpecialMarket {
  name: string;
  lines: Lines;
}

export type SpecialMarkets = SpecialMarket[];

export interface SpecialMarketResponse {
  specials: SpecialMarkets;
}

export interface Lines {
  [line_id: string]: Line;
}

export interface Line {
  name: string;
  price: number;
}
