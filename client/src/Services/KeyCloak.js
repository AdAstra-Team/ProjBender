import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://194.87.186.59:8080",
    realm: "auth",
    clientId: "dwh-manager"
});

export const getTokenFromCookies = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('keycloakToken='));
    return token ? token.split('=')[1] : null;
  };

export default keycloak;