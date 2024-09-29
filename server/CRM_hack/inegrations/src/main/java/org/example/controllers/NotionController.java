package org.example.controllers;

import org.example.model.dao.TaskResponse;
import org.example.model.dao.TokenDTO;
import org.example.model.enums.AccessLevel;
import org.example.services.ProjectService;
import org.example.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/integrations/notion")
public class NotionController {
    private final ProjectService projectService;
    private final TokenService tokenService;

    @Autowired
    public NotionController(ProjectService projectService,
                             TokenService tokenService){
        this.projectService = projectService;
        this.tokenService = tokenService;
    }

    @PostMapping("/add_tasks_by_db")
    public ResponseEntity<TaskResponse> addTask(
            @RequestParam UUID token,
            @RequestParam String url) {

        var tokenModel = tokenService.getTokenById(token);

        if (tokenModel.getAccessLevel() == AccessLevel.READ) {
            throw new IllegalArgumentException();
        }

        var project = projectService.addTaskToProject(
                new TokenDTO(tokenModel),
                tokenModel.getProjectId(),
                "description",
                "name");
        return ResponseEntity.ok(project);
    }
}
