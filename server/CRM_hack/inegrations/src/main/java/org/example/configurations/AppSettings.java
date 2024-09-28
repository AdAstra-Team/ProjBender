package org.example.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppSettings {
    @Value("${keycloak.url}")
    public String keycloakUrl;

    @Value("${projects.url}")
    public String projectsUrl;

    @Value("${client.timeout}")
    public int timeout;

    @Value("${client.retry_attempts}")
    public int retryAttempts;

    @Value("${client.retry_delay_millis}")
    public int retryDelayMillis;
    @Value("${keycloak.resource}")
    public String resourceId;
    @Value("${keycloak.realm}")
    public String realmName;
}