package org.example.controllers;

import org.example.model.dao.ProjectResponse;
import org.example.model.dao.TaskResponse;
import org.example.model.dao.TokenDTO;
import org.example.model.enums.AccessLevel;
import org.example.services.ProjectService;
import org.example.services.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/integrations/projects")
public class ProjectController {
    private final ProjectService projectService;
    private final TokenService tokenService;

    public ProjectController(ProjectService projectService,
                             TokenService tokenService){
        this.projectService = projectService;
        this.tokenService = tokenService;
    }

    @GetMapping("/project")
    public ResponseEntity<ProjectResponse> getProjectByToken(@RequestParam UUID token) {
        var project = projectService.getProjectByToken(token);
        return ResponseEntity.ok(project);
    }

    @PostMapping("/project/add_task")
    public ResponseEntity<TaskResponse> addTask(
            @RequestParam UUID token,
            @RequestParam String description,
            @RequestParam String name) {

        var tokenModel = tokenService.getTokenById(token);

        if (tokenModel.getAccessLevel() == AccessLevel.READ) {
            throw new IllegalArgumentException();
        }

        var project = projectService.addTaskToProject(
                new TokenDTO(tokenModel),
                tokenModel.getProjectId(),
                description,
                name);
        return ResponseEntity.ok(project);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleGeneralException(IllegalArgumentException ex) {
        return new ResponseEntity<>("Доступ только на чтение", HttpStatus.valueOf(400));
    }

}
