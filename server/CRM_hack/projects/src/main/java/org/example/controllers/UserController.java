package org.example.controllers;

import org.example.models.entities.Task;
import org.example.models.entities.User;
import org.example.services.TaskService;
import org.example.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public User getMe() {
        return userService.getMe();
    }

    @GetMapping("/{name}")
    public User getUserByName(@PathVariable String name) {
        return userService.getUserByName(name);
    }
}
