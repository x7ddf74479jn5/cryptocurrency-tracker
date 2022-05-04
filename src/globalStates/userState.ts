import type { User } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import {
  createUserWithEmailAndPassword as $createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword as $signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { auth } from "@/lib/firebase";

type UserState = User | null;

export const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const createUserWithEmailAndPassword = async (email: string, password: string) => {
  return await $createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
  return $signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  return isLoading;
};

export const useUserState = () => {
  return useRecoilValue(userState);
};

export const signInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};
