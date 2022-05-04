import "./index.css";

import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

import { darkTheme } from "@/lib/theme";

import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <SWRConfig
        value={{
          suspense: true,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          shouldRetryOnError: false,
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </SWRConfig>
    </RecoilRoot>
  </React.StrictMode>
);
