import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

export type CurrencyState = "usd" | "jpy";

const currencyMap = {
  usd: { currency: "USD", symbol: "$" },
  jpy: { currency: "JPY", symbol: "¥" },
};

const currencyState = atom<CurrencyState>({
  key: "currencyState",
  default: "usd",
});

export const useCurrencyState = () => {
  return useRecoilValue(currencyState);
};

export const useCurrencyMutator = () => {
  return useSetRecoilState(currencyState);
};

const currencySelector = selector({
  key: "currencySelector",
  get: ({ get }) => {
    const currency = get(currencyState);
    return currencyMap[currency];
  },
});

export const useCurrencySelector = () => {
  return useRecoilValue(currencySelector);
};

export const isCurrency = (currency: string): currency is CurrencyState => {
  return currency in currencyMap;
};

export const resetCurrencyState = () => {
  const setCurrency = useCurrencyMutator();
  setCurrency("usd");
};
