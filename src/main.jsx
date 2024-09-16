import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Router/UserContext";
import "./index.css";
import App from "./App"
// import router from "./Router/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </React.StrictMode>
);
