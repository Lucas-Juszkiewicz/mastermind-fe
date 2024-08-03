import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ReactKeycloakProvider authClient={keycloak}>
    {/* <React.StrictMode> */}
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </ReactKeycloakProvider>
);
