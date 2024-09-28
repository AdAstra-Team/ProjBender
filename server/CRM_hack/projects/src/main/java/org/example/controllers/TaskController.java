package org.example.controllers;

import org.example.models.dao.TaskRequest;
import org.example.models.dao.TaskResponse;
import org.example.models.entities.Task;
import org.example.services.MappingService;
import org.example.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private MappingService mappingService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable UUID id) {
        return taskService.getTaskById(id);
    }

    @GetMapping("/{assigneeId}")
    public List<Task> getTasksByAssigneeId(@PathVariable UUID assigneeId) {
        return taskService.getTaskByAssigneeId(assigneeId);
    }

    @GetMapping("/{authorId}")
    public List<Task> getTasksByAuthorId(@PathVariable UUID authorId) {
        return taskService.getTaskByAuthorId(authorId);
    }

    @PostMapping
    public TaskResponse createTask(@RequestBody TaskRequest taskRequest) {
        var task = mappingService.map(taskRequest, Task.class);
        var result = taskService.saveTask(task);
        return mappingService.map(result, TaskResponse.class);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable UUID id) {
        taskService.deleteTask(id);
    }
}
