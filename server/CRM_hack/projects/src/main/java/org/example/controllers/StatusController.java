package org.example.controllers;

import org.example.models.dao.StatusRequest;
import org.example.models.dao.StatusResponse;
import org.example.models.dao.TaskRequest;
import org.example.models.dao.TaskResponse;
import org.example.models.entities.Status;
import org.example.models.entities.Task;
import org.example.services.ProjectService;
import org.example.services.StatusService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/statuses")
public class StatusController {
    private final StatusService statusService;
    private final ModelMapper mapper;

    @Autowired
    public StatusController(StatusService statusService, ModelMapper mapper){
        this.statusService = statusService;
        this.mapper = mapper;
    }

    @GetMapping
    public List<StatusResponse> getAllStatuses() {
        var result = statusService.getAllStatuses();
        return mapper.map(result, new ArrayList<StatusResponse>(){}.getClass().getGenericSuperclass());
    }

    @GetMapping("/{id}")
    public StatusResponse getStatusById(@PathVariable UUID id) {
        return mapper.map(statusService.getStatusById(id), StatusResponse.class);
    }

    @PostMapping
    public StatusResponse createStatus(@RequestBody StatusRequest statusRequest) {
        var status = mapper.map(statusRequest, Status.class);
        var result = statusService.saveStatus(status);
        return mapper.map(result, StatusResponse.class);
    }

    @DeleteMapping("/{id}")
    public void deleteStatus(@PathVariable UUID id) {
        statusService.deleteStatus(id);
    }
}
