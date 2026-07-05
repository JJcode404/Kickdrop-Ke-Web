import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/sections.css";
import "./styles/shop.css";
import "./styles/product.css";
import "./styles/arrivals.css";
import "./styles/sale.css";
import "./styles/bestsellers.css";
import "./styles/brands.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
