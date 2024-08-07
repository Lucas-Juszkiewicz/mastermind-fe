import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Keycloak from "keycloak-js";
import { useEffect, useState } from "react";

const keycloak = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "mastermind",
  clientId: "mastermind",
});

interface User {
  id: string;
  nick: string;
  email: string;
  token: string;
  refreshToken: string;
}

export const redirectToKeycloak = () => {
  const clientId = "mastermind";
  const redirectUri = encodeURIComponent("http://localhost:3000/home");
  const responseType = "code";
  const scope = encodeURIComponent("openid profile email userId");
  const state = "abcd"; // You can generate a random state for security

  const keycloakUrl = `http://localhost:8080/realms/mastermind/protocol/openid-connect/auth?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;

  // Redirect to Keycloak login
  window.location.href = keycloakUrl;
};

export let user: User;
let token: string = "";
let refreshToken: string = "";
let tokenExp: number = -1;

const isTokenValid = (tokenExp: number) => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return tokenExp - 60 > currentTime; // Return true if token is still valid
};

useEffect(() => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const checkTokenValidity = () => {
    const valid = isTokenValid(tokenExp);
    setIsValid(valid);

    if (!valid) {
      refreshAccessToken();
    }
  };
  checkTokenValidity();
  const intervalId = setInterval(checkTokenValidity, 30000); // Check every 30 seconds

  return () => clearInterval(intervalId);
}, [tokenExp]);

const refreshAccessToken = async () => {
  const bodyForRefreshToken = {
    grant_type: "refresh_token",
    client_id: "mastermind",
    client_secret: "6FTAYhfizk346qspsVbkItw4ypXwgC93",
    refresh_token: refreshToken,
    // redirect_uri: "http://localhost:3000/home",
    // scope: "read_custom_scope",
  };
  const configForToken = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/realms/mastermind/protocol/openid-connect/token",
      bodyForRefreshToken,
      configForToken
    );

    token = response.data.access_token;
    refreshToken = response.data.refresh_token;
    const { preferred_username, email, userId, exp } = jwtDecode(token);
    if (exp) {
      tokenExp = exp;
    }
    user = {
      id: userId,
      nick: preferred_username,
      email: email,
      token: response.data.access_token,
      refreshToken: response.data.refresh_token,
    };
  } catch (error) {
    console.log("Failed to load token: " + error);
  }
};

export const getToken = async (authCode: string) => {
  const configForToken = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // const configForRefreshToken = {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     authorization: "Bearer " + refreshToken,
  //   },
  // };
  const bodyForToken = {
    grant_type: "authorization_code",
    client_id: "mastermind",
    client_secret: "6FTAYhfizk346qspsVbkItw4ypXwgC93",
    code: authCode,
    redirect_uri: "http://localhost:3000/home",
    scope: "read_custom_scope",
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/realms/mastermind/protocol/openid-connect/token",
      bodyForToken,
      configForToken
    );

    token = response.data.access_token;
    refreshToken = response.data.refresh_token;
    const { preferred_username, email, userId, exp } = jwtDecode(token);
    if (exp) {
      tokenExp = exp;
    }
    user = {
      id: userId,
      nick: preferred_username,
      email: email,
      token: response.data.access_token,
      refreshToken: response.data.refresh_token,
    };
  } catch (error) {
    console.log("Failed to load token: " + error);
  }
};

export default keycloak;
