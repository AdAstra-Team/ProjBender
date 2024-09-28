package org.example.models.dao;

public class TaskRequest {
    private StatusValue status;
    private UserValue user;
    private ProjectValue project;

    public StatusValue getStatus() {
        return status;
    }

    public void setStatus(StatusValue status) {
        this.status = status;
    }

    public UserValue getUser() {
        return user;
    }

    public void setUser(UserValue user) {
        this.user = user;
    }

    public ProjectValue getProject() {
        return project;
    }

    public void setProject(ProjectValue project) {
        this.project = project;
    }
}
