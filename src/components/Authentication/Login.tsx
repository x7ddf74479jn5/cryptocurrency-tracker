import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { useAlertMutator } from "@/globalStates/alertState";
import { signInWithEmailAndPassword } from "@/globalStates/userState";

type LoginProps = {
  onClose: () => void;
};

export const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAlert = useAlertMutator();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(email, password);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      onClose(); //on succesfull login--modal close
    } catch (error) {
      if (error instanceof Error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
      return;
    }
  };

  return (
    <Box
      p={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={handleChangeEmail}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={handleChangePassword}
        fullWidth
      />
      <Button variant="contained" size="large" onClick={handleSubmit} sx={{ backgroundColor: "#EEBC1D" }}>
        Login
      </Button>
    </Box>
  );
};
