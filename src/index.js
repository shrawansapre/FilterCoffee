import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CoffeeShopProvider } from "./context/CoffeeShopContext";
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // To prevent re-render
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CoffeeShopProvider>
      <Router>
        <App />
        </Router>
      </CoffeeShopProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
