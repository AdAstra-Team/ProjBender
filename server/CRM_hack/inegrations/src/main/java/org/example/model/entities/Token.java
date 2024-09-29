package org.example.model.entities;

import jakarta.persistence.*;
import org.example.model.enums.AccessLevel;

import java.util.UUID;

@Entity
public class Token {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private UUID projectId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccessLevel accessLevel;

    @Column(nullable = false)
    private long expirationTime; // Unix timestamp

    @Column(nullable = false)
    private UUID userId;

    public Token() {
    }

    public Token(UUID projectId,
                 AccessLevel accessLevel,
                 long expirationTime,
                 UUID userId) {
        this.projectId = projectId;
        this.accessLevel = accessLevel;
        this.expirationTime = expirationTime;
        this.userId = userId;
    }

    public UUID getId() {
        return id;
    }

    public UUID getProjectId() {
        return projectId;
    }

    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }

    public AccessLevel getAccessLevel() {
        return accessLevel;
    }

    public void setAccessLevel(AccessLevel accessLevel) {
        this.accessLevel = accessLevel;
    }

    public long getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(long expirationTime) {
        this.expirationTime = expirationTime;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
