package org.example.models.entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "general_user", indexes = {
        @Index(name = "idx_user_name", columnList = "name"),
        @Index(name = "idx_user_authId", columnList = "authId")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;

    @OneToMany(mappedBy = "assignee")
    private List<User> assignee;

    @OneToMany(mappedBy = "author")
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
}
