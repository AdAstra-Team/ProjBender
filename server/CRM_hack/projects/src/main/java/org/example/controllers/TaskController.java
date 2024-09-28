package org.example.controllers;

import org.example.configurations.ModelMapperConfig;
import org.example.models.dao.TaskRequest;
import org.example.models.dao.TaskResponse;
import org.example.models.entities.Task;
import org.example.services.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public List<TaskResponse> getAllTasks() {
        var result = taskService.getAllTasks();
        return mapper.map(result, new ArrayList<TaskResponse>(){}.getClass().getGenericSuperclass());
    }

    @GetMapping("/{id}")
    public TaskResponse getTaskById(@PathVariable UUID id) {
        return mapper.map(taskService.getTaskById(id), TaskResponse.class);
    }

    @GetMapping("/{assigneeId}")
    public List<TaskResponse> getTasksByAssigneeId(@PathVariable UUID assigneeId) {
        var result = taskService.getTaskByAssigneeId(assigneeId);
        return mapper.map(result, new ArrayList<TaskResponse>(){}.getClass().getGenericSuperclass());
    }

    @GetMapping("/{authorId}")
    public List<TaskResponse> getTasksByAuthorId(@PathVariable UUID authorId) {
        var result = taskService.getTaskByAuthorId(authorId);
        return mapper.map(result, new ArrayList<TaskResponse>(){}.getClass().getGenericSuperclass());
    }

    @PostMapping
    public TaskResponse createTask(@RequestBody TaskRequest taskRequest) {
        var task = mapper.map(taskRequest, Task.class);
        var result = taskService.saveTask(task);
        return mapper.map(result, TaskResponse.class);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable UUID id) {
        taskService.deleteTask(id);
    }
}
