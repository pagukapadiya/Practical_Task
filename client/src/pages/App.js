import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { persistor, store } from "../store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";
import { setAuthToken } from "../libs/HttpClient";
import Loader from "../common/components/Loader";
import { NoInternetPage } from "../common/components";
import PagesRoutes from "../routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Checking if navigator is online or not
  if (!navigator.onLine) {
    return <NoInternetPage />;
  }

  // Checking if browser is offline or not
  window.onoffline = () => {
    return <NoInternetPage />;
  };

  // Checking if browser is online or not
  window.ononline = () => {
    window.location.reload(true);
  };

  /**
   * This function will call and page load, and will check, if user is registered or not, and setting authentication token
   */
  const handleOnBeforeLift = () => {
    if (
      store.getState().user.accessToken !== undefined &&
      store.getState().user.accessToken !== null
    ) {
      setAuthToken(store.getState().user.accessToken);
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={handleOnBeforeLift}
        >
          <QueryClientProvider client={queryClient}>
            <PagesRoutes />
            <ToastContainer />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}
export default App;
