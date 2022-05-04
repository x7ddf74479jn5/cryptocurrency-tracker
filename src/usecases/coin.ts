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
  return useSWR<CoinListResponse>(coinCacheKeyGenerator("list"), () => fetchCoinList(currency));
};

export const useHistoricalChart = (id: string, currency: string, days?: number) => {
  return useSWR<HistoricalChartResponse>(coinCacheKeyGenerator("chart"), () =>
    fetchHistoricalChart(id, days, currency)
  );
};

export const useSingleCoin = (id: string) => {
  return useSWR<SingleCoinResponse>(coinCacheKeyGenerator("single"), () => fetchSingleCoin(id));
};

export const useTrendingCoins = (currency: string) => {
  return useSWR<TrendingCoinsResponse>(coinCacheKeyGenerator("trending"), () => fetchTrendingCoins(currency));
};
