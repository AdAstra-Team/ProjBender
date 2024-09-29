package org.example.model.dao;

import java.util.UUID;

public class TaskResponse {
  private UUID id;
  private String description;
  private String name;
  private Integer hoursRemained;
  private Integer hoursDone;
  private Integer priority;
  private StatusResponse status;
  private UserResponse user;
  private ProjectResponse project;

  public UserResponse getAuthor() {
    return user;
  }

  public void setAuthor(UserResponse author) {
    this.user = author;
  }

  public Integer getHoursRemained() {
    return hoursRemained;
  }

  public void setHoursRemained(Integer hoursRemained) {
    this.hoursRemained = hoursRemained;
  }

  public Integer getHoursDone() {
    return hoursDone;
  }

  public void setHoursDone(Integer hoursDone) {
    this.hoursDone = hoursDone;
  }

  public Integer getPriority() {
    return priority;
  }

  public void setPriority(Integer priority) {
    this.priority = priority;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public StatusResponse getStatus() {
    return status;
  }

  public void setStatus(StatusResponse status) {
    this.status = status;
  }

  public ProjectResponse getProject() {
    return project;
  }

  public void setProject(ProjectResponse project) {
    this.project = project;
  }
}
