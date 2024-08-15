import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "mastermind",
  clientId: "mastermind",
});


export default keycloak;
