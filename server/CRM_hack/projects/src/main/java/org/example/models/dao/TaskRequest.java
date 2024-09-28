package org.example.models.dao;

public class TaskRequest {
    private String description;
    private String name;
    private int hoursRemained;
    private int hoursDone;
    private int priority;

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

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public int getHoursDone() {
        return hoursDone;
    }

    public void setHoursDone(int hoursDone) {
        this.hoursDone = hoursDone;
    }

    public int getHoursRemained() {
        return hoursRemained;
    }

    public void setHoursRemained(int hoursRemained) {
        this.hoursRemained = hoursRemained;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
