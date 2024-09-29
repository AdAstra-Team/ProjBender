package org.example.clients;

import org.example.configurations.AppSettings;
import org.example.model.dao.AuthResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.time.Duration;

@Component
public class NotionClient {
    private static final Logger logger = LoggerFactory.getLogger(KeycloakClient.class);

    private final AppSettings appSettings;

    private final String authEndpoint;

    @Autowired
    public NotionClient(@Qualifier("keycloakClient") WebClient keycloakClient, AppSettings appSettings) {
        this.appSettings = appSettings;
        authEndpoint = "/realms/" + appSettings.realmName + "/protocol/openid-connect/token";
    }

    public Mono<String> auth(String clientId, String username, String password) {
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        var requestBody = "client_id=" + clientId +
                "&username=" + username +
                "&password=" + password +
                "&grant_type=password";

        return Mono.empty();
    }
}
