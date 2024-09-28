package org.example.models.dao;

import jakarta.persistence.*;
import org.example.models.entities.Task;
import org.example.models.entities.User;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public class ProjectRequest {
    private UUID id;
    private String name;
    private List<TaskResponse> tasks;
    private List<UserValue> users;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TaskResponse> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskResponse> tasks) {
        this.tasks = tasks;
    }

    public List<UserValue> getUsers() {
        return users;
    }

    public void setUsers(List<UserValue> users) {
        this.users = users;
    }
}
