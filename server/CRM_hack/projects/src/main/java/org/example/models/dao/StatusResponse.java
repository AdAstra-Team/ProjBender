package org.example.models.dao;

import java.util.UUID;

public class StatusResponse extends StatusRequest {
    private UUID id;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
