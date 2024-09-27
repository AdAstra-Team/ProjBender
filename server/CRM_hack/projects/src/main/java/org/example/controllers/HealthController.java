package org.example.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.UUID;

@RestController
@RequestMapping("/health")
public class HealthController {
    private static final Logger logger = LogManager.getLogger(HealthController.class);

    @Autowired
    public HealthController() {
    }

    @GetMapping("/ping")
    public ResponseEntity<String> getNumber() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var jwt = (Jwt)(authentication.getCredentials());
        var uuid = UUID.fromString(jwt.getClaim("sub"));
        var name = jwt.getClaim("preferred_username").toString();
        var email = jwt.getClaim("email").toString();

        return new ResponseEntity<>(uuid + " " + name + " " + email, HttpStatus.OK);
    }
}