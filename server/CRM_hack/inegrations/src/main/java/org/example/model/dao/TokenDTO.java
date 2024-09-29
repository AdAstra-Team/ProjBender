package org.example.model.dao;

import org.example.model.entities.Token;
import org.example.model.enums.AccessLevel;

import java.util.UUID;

public class TokenDTO {
    private UUID id;
    private UUID projectId;
    private AccessLevel accessLevel;
    private long expirationTime;
    private UUID createdByUserId;


    // Constructors, Getters, Setters
    public TokenDTO(UUID id, UUID projectId, AccessLevel accessLevel, long expirationTime, UUID createdByUserId) {
        this.id = id;
        this.projectId = projectId;
        this.accessLevel = accessLevel;
        this.expirationTime = expirationTime;
        this.createdByUserId = createdByUserId;
    }

    public TokenDTO(Token token) {
        this.id = token.getId();
        this.projectId = token.getProjectId();
        this.accessLevel = token.getAccessLevel();
        this.expirationTime = token.getExpirationTime();
        this.createdByUserId = token.getUserId();
    }


    public UUID getProjectId() {
        return projectId;
    }

    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public long getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(long expirationTime) {
        this.expirationTime = expirationTime;
    }

    public UUID getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(UUID createdByUserId) {
        this.createdByUserId = createdByUserId;
    }

    public AccessLevel getAccessLevel() {
        return accessLevel;
    }

    public void setAccessLevel(AccessLevel accessLevel) {
        this.accessLevel = accessLevel;
    }
}

