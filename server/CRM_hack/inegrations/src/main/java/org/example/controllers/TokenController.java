package org.example.controllers;

import org.example.model.dao.TokenDTO;
import org.example.model.enums.AccessLevel;
import org.example.services.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/integrations/tokens")
public class TokenController {
    private final TokenService tokenService;

    public TokenController(TokenService tokenService){
        this.tokenService = tokenService;
    }

    @PostMapping("/create")
    public ResponseEntity<TokenDTO> createToken(@RequestParam UUID projectId,
                                                @RequestParam AccessLevel accessLevel,
                                                @RequestParam long expirationTime) {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var jwt = (Jwt)(authentication.getCredentials());
        var uuid = UUID.fromString(jwt.getClaim("sub"));

        TokenDTO token = tokenService.createToken(projectId, accessLevel, expirationTime, uuid);
        return ResponseEntity.ok(token);
    }

    @DeleteMapping("/{tokenId}")
    public ResponseEntity<Void> deleteToken(@PathVariable UUID tokenId) {
        tokenService.deleteToken(tokenId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user")
    public ResponseEntity<List<TokenDTO>> getTokensByUserId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var jwt = (Jwt)(authentication.getCredentials());
        var uuid = UUID.fromString(jwt.getClaim("sub"));

        var tokens = tokenService.getTokensByUserId(uuid);
        return ResponseEntity.ok(tokens);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TokenDTO>> getTokensByProjectId(@PathVariable UUID projectId) {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var jwt = (Jwt)(authentication.getCredentials());
        var uuid = UUID.fromString(jwt.getClaim("sub"));

        var tokens = tokenService.getTokensByProjectIdAndUserId(projectId, uuid);
        return ResponseEntity.ok(tokens);
    }
}
