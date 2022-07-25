import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Socket from "contexts/SocketCtx";
import { store } from "./store";
import React from "react";
import App from "./App";
import "./i18n";

import "react-notifications/lib/notifications.css";
import "./assets/scss/index.scss";
import "./assets/css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Socket>
      <App />
    </Socket>
  </Provider>
);
