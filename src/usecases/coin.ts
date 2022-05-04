import useSWR from "swr";

import { createCacheKeyGenerator } from "@/lib/swr";
import type {
  CoinListResponse,
  HistoricalChartResponse,
  SingleCoinResponse,
  TrendingCoinsResponse,
} from "@/models/api";
import { fetchCoinList, fetchHistoricalChart, fetchSingleCoin, fetchTrendingCoins } from "@/repositories/coin";

const coinCacheKeyGenerator = createCacheKeyGenerator("coin");

export const useCoinList = (currency: string) => {
  return useSWR<CoinListResponse>(coinCacheKeyGenerator("list", currency), () => fetchCoinList(currency));
};

export const useHistoricalChart = (id: string, currency: string, days?: number) => {
  return useSWR<HistoricalChartResponse>(coinCacheKeyGenerator("chart", id, currency, days?.toString() ?? ""), () =>
    fetchHistoricalChart(id, days, currency)
  );
};

export const useSingleCoin = (id: string) => {
  return useSWR<SingleCoinResponse>(coinCacheKeyGenerator("single", id), () => fetchSingleCoin(id), { suspense: true });
};

export const useTrendingCoins = (currency: string) => {
  return useSWR<TrendingCoinsResponse>(coinCacheKeyGenerator("trending", currency), () => fetchTrendingCoins(currency));
};
