package org.example.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tokens")
public class TokenController {

    @GetMapping("/{projectId}")
    public ResponseEntity<String> getTokenByProjectId(@PathVariable("projectId") Long projectId) {
        // Здесь нужно реализовать логику получения токена для проекта
        String token = generateTokenForProject(projectId);
        return ResponseEntity.ok(token);
    }

    @PostMapping()
    private String generateTokenForProject(Long projectId) {
        return "sampleTokenForProject-" + projectId;
    }
}
