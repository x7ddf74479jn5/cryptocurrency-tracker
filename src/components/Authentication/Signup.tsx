import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { useAlertMutator } from "@/globalStates/alertState";
import { createUserWithEmailAndPassword } from "@/globalStates/userState";

type SignupProps = {
  onClose: () => void;
};

export const Signup: React.FC<SignupProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const setAlert = useAlertMutator();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(email, password);

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      onClose();
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
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleChangeConfirmPassword}
        fullWidth
      />
      <Button variant="contained" size="large" sx={{ backgroundColor: "#EEBC1D" }} onClick={handleSubmit}>
        Sign Up
      </Button>
    </Box>
  );
};
