/* eslint-disable @typescript-eslint/naming-convention */
import { client } from "@/lib/ky";
import type {
  CoinListResponse,
  HistoricalChartResponse,
  SingleCoinResponse,
  TrendingCoinsResponse,
} from "@/models/api";

export const fetchCoinList = async (currency: string) => {
  const res: CoinListResponse = await client
    .get("markets", {
      searchParams: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    })
    .json();
  return res;
};

export const fetchSingleCoin = async (id: string) => {
  const res: SingleCoinResponse = await client.get(id).json();
  return res;
};

export const fetchHistoricalChart = async (id: string, days = 365, currency: string) => {
  const res: HistoricalChartResponse = await client
    .get(`${id}/market_chart`, {
      searchParams: {
        vs_currency: currency,
        days,
      },
    })
    .json();
  return res;
};

export const fetchTrendingCoins = async (currency: string) => {
  const res: TrendingCoinsResponse = await client
    .get("markets", {
      searchParams: {
        vs_currency: currency,
        order: "gecko_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    })
    .json();
  return res;
};
