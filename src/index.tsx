import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { UserAuthProvider } from "./UserAuthProvider";
import { AuthMethodsProvider } from "./AuthMethodsProvider";
import { GameDataProvider } from "./GameDataProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ReactKeycloakProvider authClient={keycloak}>
            <GameDataProvider>
    <UserAuthProvider>
      <AuthMethodsProvider>
    {/* <React.StrictMode> */}
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    {/* </React.StrictMode> */}
    </AuthMethodsProvider>
    </UserAuthProvider>
    </GameDataProvider>
  </ReactKeycloakProvider>
);
