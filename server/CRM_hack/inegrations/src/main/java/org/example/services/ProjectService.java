package org.example.services;


import org.example.clients.KeycloakClient;
import org.example.clients.ProjectsClient;
import org.example.configurations.AppSettings;
import org.example.model.dao.*;
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

    public TaskResponse addTaskToProject(TokenDTO tokenModel, UUID projectId, String description, String name) {

        var accessToken = keycloakClient.auth(appSettings.resourceId, appSettings.username, appSettings.password);
        var newTask = new TaskResponse();

        newTask.setDescription(description);
        newTask.setName(name);
        var projectModel = projectsClient.GetProjectById(projectId, accessToken.block()).block();
        newTask.setProject(projectModel);

        var userModel = new UserResponse();
        userModel.setId(tokenModel.getCreatedByUserId());

        newTask.setAuthor(userModel);
        //var status = new StatusResponse();
        //status.setId(projectId);
        //newTask.setStatus(status);
        newTask.setHoursDone(0);
        newTask.setHoursRemained(0);
        newTask.setPriority(0);

        return projectsClient.AddTaskToProject(newTask, accessToken.block()).block();
    }

}
