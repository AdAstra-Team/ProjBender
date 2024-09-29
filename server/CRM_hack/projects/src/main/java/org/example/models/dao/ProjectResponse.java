package org.example.models.dao;

import org.example.models.entities.Project;

import java.util.UUID;
import java.util.stream.Collectors;

public class ProjectResponse extends ProjectRequest {
    private UUID id;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
    public ProjectResponse(){
    }
    public ProjectResponse(Project project){
        id = project.getId();
        setName(project.getName());
        setTasks(project.getTasks().stream()
                .map(TaskResponse::new) // Используем конструктор TaskResponse(Task task)
                .collect(Collectors.toList()));
    }
}
