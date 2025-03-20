"use client";

import { Provider } from "react-redux";

import store from "../redux/store";

function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
