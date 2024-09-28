package org.example.services;


import org.example.clients.KeycloakClient;
import org.example.clients.ProjectsClient;
import org.example.configurations.AppSettings;
import org.example.model.dao.ProjectResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectsClient projectsClient;
    private final KeycloakClient keycloakClient;
    private final AppSettings appSettings;
    private final TokenService tokenService;

    @Autowired
    public ProjectService(ProjectsClient projectsClient,
                          KeycloakClient keycloakClient,
                          TokenService tokenService,
                          AppSettings appSettings) {
        this.projectsClient = projectsClient;
        this.keycloakClient = keycloakClient;
        this.tokenService = tokenService;
        this.appSettings = appSettings;
    }

    public ProjectResponse getProjectByToken(UUID token) {
        var projectId = tokenService.getProjectIdByToken(token);
        var accessToken = keycloakClient.auth(appSettings.resourceId, appSettings.username, appSettings.password);
        return projectsClient.GetProjectById(projectId, accessToken.block()).block();
    }
}
