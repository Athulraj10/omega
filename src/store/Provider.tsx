"use client";

import { Provider } from "react-redux";
import React from "react";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { store } from "./store";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
        {children}
      {/* <PersistGate loading={null}>
      </PersistGate> */}
    </Provider>
  );
}

export default Providers;
