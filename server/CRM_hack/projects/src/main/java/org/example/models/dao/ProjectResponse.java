package org.example.models.dao;

import java.util.UUID;

public class ProjectResponse extends ProjectRequest {
    private UUID id;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
