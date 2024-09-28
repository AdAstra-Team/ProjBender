package org.example.models.entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "user", indexes = {
    @Index(name = "idx_user_name", columnList = "name"),
    @Index(name = "idx_user_authId", columnList = "authId")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;
    private UUID authId;

    @OneToMany(mappedBy = "user")
    private List<Task> tasks;

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

    public UUID getAuthId() {
        return authId;
    }

    public void setAuthId(UUID authId) {
        this.authId = authId;;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
