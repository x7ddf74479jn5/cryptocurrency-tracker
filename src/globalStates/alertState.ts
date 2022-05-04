import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type AlertState = {
  open: boolean;
  message: string | null;
  type: "success" | "error" | undefined | null;
};

const initialState: AlertState = { open: false, message: "", type: undefined };

const alertState = atom<AlertState>({
  key: "alertState",
  default: initialState,
});

export const useAlertState = () => {
  return useRecoilValue(alertState);
};

export const useAlertMutator = () => {
  return useSetRecoilState(alertState);
};

export const resetAlertState = () => {
  const setAlert = useAlertMutator();
  setAlert(initialState);
};
