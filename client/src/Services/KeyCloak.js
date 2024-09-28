import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://detulie.space:8080/",
    realm: "auth",
    clientId: "dwh-manager",
    response_type: "code",
});

export default keycloak;