import { LinearProgress } from "@mui/material";
import { styled } from "@mui/system";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Alert } from "@/components/Alert";
import { Header } from "@/components/Header";
import { useAuthState } from "@/globalStates/userState";

const HomePage = React.lazy(() => import("./Pages/HomePage"));
const CoinPage = React.lazy(() => import("./Pages/CoinPage"));

const AppContainer = styled("div")({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});

const App: React.FC = () => {
  useAuthState();

  return (
    <React.Fragment>
      <AppContainer>
        <Header />
        <Suspense fallback={<LinearProgress style={{ backgroundColor: "gold" }} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </Suspense>
      </AppContainer>
      <Alert />
    </React.Fragment>
  );
};

export default App;
