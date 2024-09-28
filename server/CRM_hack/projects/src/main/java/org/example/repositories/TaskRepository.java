package org.example.repositories;

import org.example.models.entities.Project;
import org.example.models.entities.Task;
import org.example.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByAssigneeId(UUID assigneeId);

    List<Task> findByAuthorId(UUID authorId);
}
