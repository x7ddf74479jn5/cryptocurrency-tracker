import { AppBar, Backdrop, Box, Button, Fade, Modal, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import React, { useCallback, useState } from "react";
import GoogleButton from "react-google-button";

import { useAlertMutator } from "@/globalStates/alertState";
import { signInWithGoogle } from "@/globalStates/userState";

import { Login } from "./Login";
import { Signup } from "./Signup";

const Paper = styled("div")(({ theme }) => ({
  width: 400,
  backgroundColor: theme.palette.background.paper,
  color: "white",
  borderRadius: 10,
  position: "relative",
}));

const Google = styled(Box)({
  padding: "24px",
  paddingTop: 0,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: "20px",
  fontSize: 20,
});

export const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const setAlert = useAlertMutator();

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    //arg by comp
    setValue(newValue);
  };

  const handleLogin = useCallback(async () => {
    try {
      const res = await signInWithGoogle();
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${res.user.email}`,
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    }
  }, [setAlert]);

  return (
    <div>
      <Button
        variant="contained"
        sx={{ width: 85, height: 40, marginLeft: "15px", backgroundColor: "#EEBC1D" }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{
          display: "flex",
          // position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isOpen}>
          <Paper>
            <AppBar
              position="static"
              sx={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs value={value} onChange={handleChange} variant="fullWidth" sx={{ borderRadius: 10 }}>
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login onClose={handleClose} />}
            {value === 1 && <Signup onClose={handleClose} />}
            <Google>
              <span>OR</span>
              <GoogleButton style={{ width: "100%", outline: "none" }} onClick={handleLogin} />
            </Google>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};
