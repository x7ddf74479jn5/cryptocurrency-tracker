import { useCallback } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { resetAlertState } from "@/globalStates/alertState";
import { resetCurrencyState } from "@/globalStates/currencyState";

const ErrorFallback = ({ error, resetErrorBoundary: handleReset }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={handleReset}>Try again</button>
    </div>
  );
};

export const AppErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const handleReset = useCallback(() => {
    resetAlertState(), resetCurrencyState();
    navigate("/");
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      {children}
    </ErrorBoundary>
  );
};
