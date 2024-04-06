import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import State from "./Context/State";
import { store } from "./store/reducer";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store = {store}>
      <State>
        <App />
      </State>
    </Provider>
  </Router>
);
