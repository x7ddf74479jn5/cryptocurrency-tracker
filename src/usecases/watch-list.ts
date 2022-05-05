import useSWR, { mutate } from "swr";

import { createCacheKeyGenerator } from "@/lib/swr";
import type { WatchList } from "@/models";
import { getWatchList, getWatchListDocRef, updateWatchList } from "@/repositories/watch-list";

const watchListCacheKey = createCacheKeyGenerator("watchList")();

export const useWatchList = (uid: string | undefined) => {
  const watchListDocRef = uid ? getWatchListDocRef(uid) : null;
  return useSWR<WatchList>(watchListCacheKey, () => getWatchList(watchListDocRef));
};

export const useUpdateWatchList = async (uid: string, data: Partial<WatchList>) => {
  const watchListDocRef = getWatchListDocRef(uid);
  await updateWatchList(watchListDocRef, data);
  await mutate(
    watchListCacheKey,
    (prev?: WatchList) => {
      if (!prev) return;
      return { ...prev, ...data };
    },
    false
  );
};
