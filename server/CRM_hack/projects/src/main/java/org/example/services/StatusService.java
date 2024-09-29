package org.example.services;

import org.example.models.entities.Status;
import org.example.models.entities.Task;
import org.example.repositories.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StatusService {
    @Autowired
    private StatusRepository statusRepository;

    public void deleteStatus(UUID id) {
        statusRepository.deleteById(id);
    }

    public Status saveStatus(Status status) {
        return statusRepository.save(status);
    }

    public List<Status> getAllStatuses() {
        return statusRepository.findAll();
    }

    public Status getStatusById(UUID id) {
        return statusRepository.findById(id).orElse(null);
    }
}
