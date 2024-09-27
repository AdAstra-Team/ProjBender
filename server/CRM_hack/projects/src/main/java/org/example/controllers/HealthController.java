package org.example.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/health")
public class HealthController {
    private static final Logger logger = LogManager.getLogger(HealthController.class);

    @Autowired
    public HealthController() {
    }

    @GetMapping("/ping")
    public ResponseEntity<Integer> getNumber() {
        return new ResponseEntity<>(200, HttpStatus.OK);
    }
}