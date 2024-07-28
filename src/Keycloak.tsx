import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "mastermind",
  clientId: "mastermind",
});

export const redirectToKeycloak = () => {
  const clientId = "mastermind";
  const redirectUri = encodeURIComponent("http://localhost:3000/login");
  const responseType = "code";
  const scope = encodeURIComponent("openid profile");
  const state = "abcd"; // You can generate a random state for security

  const keycloakUrl = `http://localhost:8080/realms/mastermind/protocol/openid-connect/auth?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;

  // Redirect to Keycloak login
  window.location.href = keycloakUrl;
};

const getIdFormToken = () => {
  const id = keycloak.subject;
  console.log(id);
};

export default keycloak;
