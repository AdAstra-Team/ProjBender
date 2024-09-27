package org.example.repositories;

import org.example.models.entities.Project;
import org.example.models.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
}
