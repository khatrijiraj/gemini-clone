import { createRoot } from "react-dom/client";
import React from "react";
import ContextProvider from "./context/Context";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);