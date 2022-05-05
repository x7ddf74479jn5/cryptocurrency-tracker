import type { SelectChangeEvent } from "@mui/material";
import { AppBar, Container, MenuItem as MUIMenuItem, Select, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { isCurrency } from "@/globalStates/currencyState";
import { useCurrencyMutator, useCurrencyState } from "@/globalStates/currencyState";
import { useUserState } from "@/globalStates/userState";

import { AuthModal } from "./Authentication/AuthModal";
import { UserSidebar } from "./Authentication/UserSidebar";

const MenuItem = styled(MUIMenuItem)({
  color: "gold",
  fontWeight: "bold",
});

export const Header = () => {
  const navigate = useNavigate();
  const user = useUserState();
  const currency = useCurrencyState();
  const setCurrency = useCurrencyMutator();

  const handleSetCurrency = (e: SelectChangeEvent) => {
    const c = e.target.value;
    if (!isCurrency(c)) return;
    setCurrency(c);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flex: 1,
              color: "gold",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleNavigate}
          >
            Crypto Tracker
          </Typography>
          <Select
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            sx={{
              width: 100,
              height: 40,
              marginLeft: "15px",
              color: "gold",
              fontWeight: "bold",
            }}
            onChange={handleSetCurrency}
          >
            <MenuItem value="usd">USD</MenuItem>
            <MenuItem value="jpy">JPY</MenuItem>
          </Select>
          {user ? (
            <Suspense fallback={<></>}>
              <UserSidebar />
            </Suspense>
          ) : (
            <AuthModal />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
