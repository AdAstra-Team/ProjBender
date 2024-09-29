package org.example.models.dao;

import org.example.models.entities.Task;

import java.util.UUID;

public class TaskResponse extends TaskRequest {
    private UUID id;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public TaskResponse() {

    }

    public TaskResponse(Task task) {
        setId(task.getId());
        var user = new UserValue();
        user.setId(task.getAuthor().getId());
        user.setName(task.getAuthor().getName());
        setAuthor(user);
        setDescription(task.getDescription());
        var userAssignee = new UserValue();

        if(task.getAssignee() != null) {
            userAssignee.setId(task.getAssignee().getId());
            userAssignee.setName(task.getAssignee().getName());
        }

        setAssignee(userAssignee);
        setHoursDone(task.getHoursDone());
        setPriority(task.getPriority());
        var project = new ProjectValue();
        project.setId(task.getProject().getId());
        project.setName(task.getProject().getName());
        setProject(project);
    }
}
