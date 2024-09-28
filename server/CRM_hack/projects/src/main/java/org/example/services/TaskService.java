package org.example.services;

import org.example.models.entities.Task;
import org.example.repositories.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.UUID;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(UUID id) {
        return taskRepository.findById(id).orElse(null);
    }

    public List<Task> getTaskByAssigneeId(UUID assigneeId) {
        return taskRepository.findByAssigneeId(assigneeId);
    }

    public List<Task> getTaskByAuthorId(UUID authorId) {
        return taskRepository.findByAuthorId(authorId);
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(UUID id) {
        taskRepository.deleteById(id);
    }
}