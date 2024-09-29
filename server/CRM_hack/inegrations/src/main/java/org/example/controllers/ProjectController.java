package org.example.controllers;

import org.example.model.dao.ProjectResponse;
import org.example.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/integrations/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService){
        this.projectService = projectService;
    }

    @GetMapping("/project/{token}")
    public ResponseEntity<ProjectResponse> getTokensByUserId(@PathVariable UUID token) {
        var project = projectService.getProjectByToken(token);
        return ResponseEntity.ok(project);
    }
}
