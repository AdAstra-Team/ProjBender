package org.example.clients;

import org.example.configurations.AppSettings;
import org.example.model.dao.ProjectResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.http.HttpHeaders;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.UUID;

@Component
public class ProjectsClient {
    private static final Logger logger = LoggerFactory.getLogger(ProjectsClient.class);

    private final WebClient projectsClient;

    private final AppSettings appSettings;
    private static final String GET_PROJECT_BY_ID_ENDPOINT = "/api/projects/";

    @Autowired
    public ProjectsClient(@Qualifier("projectsClient") WebClient projectsClient, AppSettings appSettings) {
        this.projectsClient = projectsClient;
        this.appSettings = appSettings;
    }


    public Mono<ProjectResponse> GetProjectById(UUID id, String adminAccessToken) {
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(adminAccessToken);

        return projectsClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(GET_PROJECT_BY_ID_ENDPOINT + id)
                        .build())
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(ProjectResponse.class)
                .retryWhen(Retry.fixedDelay(appSettings.retryAttempts,
                        Duration.ofMillis(appSettings.retryDelayMillis)));
    }
}
