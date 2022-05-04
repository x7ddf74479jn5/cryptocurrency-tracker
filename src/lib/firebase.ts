import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { FirestoreDataConverter, QueryDocumentSnapshot, WithFieldValue } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "@/config/firebaseConfig";

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const getConverter = <T extends object>(assert: (data: unknown) => asserts data is T): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data({ serverTimestamps: "estimate" });

    const result = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (typeof value.toString == "function" && value.toString().startsWith("Timestamp")) {
          return [key, value.toDate()];
        }
        return [key, value];
      })
    );

    assert(result);

    return result;
  },
});

export { auth, db, getConverter, storage };
