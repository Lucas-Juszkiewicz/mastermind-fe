import axios from "axios";
import Keycloak from "keycloak-js";
import qs from "qs";

const keycloak = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "mastermind",
  clientId: "mastermind",
});

export const redirectToKeycloak = () => {
  const clientId = "mastermind";
  const redirectUri = encodeURIComponent("http://localhost:3000/home");
  const responseType = "code";
  const scope = encodeURIComponent("openid profile");
  const state = "abcd"; // You can generate a random state for security

  const keycloakUrl = `http://localhost:8080/realms/mastermind/protocol/openid-connect/auth?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;

  // Redirect to Keycloak login
  window.location.href = keycloakUrl;
};

export const getToken = async (authCode: string) => {
  let token = undefined;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const body = {
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
      body,
      config
    );
    token = response.data.access_token;
  } catch (error) {
    console.log("Failed to load token: " + error);
  }
  return token;
};

export default keycloak;
