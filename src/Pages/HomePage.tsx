import React, { Suspense } from "react";

import { Banner } from "@/components/Banner/Banner";
import { AppErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingSpinner } from "@/components/Spinner/LoadingSpinner";
import { Center } from "@/components/UI/Center";

const CoinsTable = React.lazy(() => import("../components/CoinsTable"));

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <Banner />
      <AppErrorBoundary>
        <Suspense
          fallback={
            <Center>
              <LoadingSpinner />
            </Center>
          }
        >
          <CoinsTable />
        </Suspense>
      </AppErrorBoundary>
    </React.Fragment>
  );
};

export default HomePage;
