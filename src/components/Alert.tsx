import type { SnackbarCloseReason } from "@mui/material";
import { Alert as MuiAlert, Snackbar } from "@mui/material";

import { useAlertMutator, useAlertState } from "@/globalStates/alertState";

export const Alert = () => {
  const alert = useAlertState();
  const setAlert = useAlertMutator();

  const handleCloseSnackbar = (_event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, message: null, type: null });
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: null, type: null });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
      <MuiAlert onClose={handleCloseAlert} elevation={10} variant="filled" severity={alert.type ?? "success"}>
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};
