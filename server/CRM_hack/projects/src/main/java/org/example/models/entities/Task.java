package org.example.models.entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String description;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    private int hoursRemained;
    private int hoursDone;

    // Геттеры и сеттеры
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public int getHoursRemained() {
        return hoursRemained;
    }

    public void setHoursRemained(int hoursRemained) {
        this.hoursRemained = hoursRemained;
    }

    public int getHoursDone() {
        return hoursDone;
    }

    public void setHoursDone(int hoursDone) {
        this.hoursDone = hoursDone;
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}