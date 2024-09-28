package org.example.controllers;

import org.example.models.entities.Task;
import org.example.models.entities.User;
import org.example.services.TaskService;
import org.example.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
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
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var jwt = (Jwt)(authentication.getCredentials());
        var uuid = UUID.fromString(jwt.getClaim("sub"));

        return userService.getUserByAuthId(uuid);
    }

    @GetMapping("/{name}")
    public User getUserByName(@PathVariable String name) {
        return userService.getUserByName(name);
    }
}
