import type { DocumentReference, PartialWithFieldValue } from "firebase//firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { db, getConverter } from "@/lib/firebase";
import type { WatchList } from "@/models/watch-list";
import { watchListSchema } from "@/models/watch-list";

const watchListConverter = getConverter<WatchList>(watchListSchema.parse);

export const getWatchListDocRef = (uid: string) => {
  return doc(db, "watchList", uid).withConverter(watchListConverter);
};

export const getWatchList = async (ref: DocumentReference<WatchList> | null) => {
  if (!ref) return null;
  const doc = await getDoc(ref);
  return doc.data();
};

export const updateWatchList = async (ref: DocumentReference<WatchList>, data: PartialWithFieldValue<WatchList>) => {
  await setDoc(ref, data, { merge: true }); //merging everything which is already in userId doc
};
