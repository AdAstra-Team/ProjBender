package org.example.models.dao;

import java.util.UUID;

public class TaskResponse extends TaskRequest {
    private UUID id;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
