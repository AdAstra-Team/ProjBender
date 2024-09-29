package org.example.controllers;

import org.example.models.dao.ProjectRequest;
import org.example.models.dao.ProjectResponse;
import org.example.models.dao.TaskResponse;
import org.example.models.entities.Project;
import org.example.models.entities.Task;
import org.example.services.ProjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;
    private final ModelMapper mapper;

    @Autowired
    public ProjectController(ProjectService projectService, ModelMapper mapper){
        this.projectService = projectService;
        this.mapper = mapper;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        var result = projectService.getAllProjects();
        return mapper.map(result, new ArrayList<TaskResponse>(){}.getClass().getGenericSuperclass());
    }

    @GetMapping("/{id}")
    public ProjectResponse getProjectById(@PathVariable UUID id) {
        var project = projectService.getProjectById(id);
        return new ProjectResponse(project);
    }

    @PostMapping
    public ProjectResponse createProject(@RequestBody ProjectRequest projectRequest) {
        var project = mapper.map(projectRequest, Project.class);
        var result = projectService.saveProject(project);
        return mapper.map(result, ProjectResponse.class);
    }

    @PostMapping("/create_empty_project")
    public Project createEmptyProject() {
        var project = new Project();
        return projectService.saveProject(project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable UUID id) {
        projectService.deleteProject(id);
    }
}