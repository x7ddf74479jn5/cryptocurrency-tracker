import { z } from "zod";

import type { HistoricalChartResponse } from "./api";

export const coinSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  // trending coin
  image: z.string(),
  name: z.string(),
  symbol: z.string(),
  profit: z.number(), // price_change_percentage_24h
  currentPrice: z.number(),
  // single coin
  // image, name, description, symbol, current_price, market_cap, market_cap_rank,
  marketData: z.object({
    currentPrice: z.number(),
  }),
  marketCapRank: z.number(),
});

export type Coin = z.infer<typeof coinSchema>;

export type HistoricData = Pick<HistoricalChartResponse, "prices">;
