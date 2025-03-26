import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "swiper/swiper-bundle.css"; // Correct Swiper global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
