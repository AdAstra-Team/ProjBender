package org.example.services;

import org.example.configurations.model.dao.TokenDTO;
import org.example.configurations.model.entities.Token;
import org.example.configurations.model.enums.AccessLevel;
import org.example.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TokenService {

    private final TokenRepository tokenRepository;

    @Autowired
    public TokenService(TokenRepository tokenRepository){
        this.tokenRepository = tokenRepository;
    }

    public TokenDTO createToken(UUID projectId, AccessLevel accessLevel, long expirationTime, UUID userId) {
        Token token = new Token(projectId, accessLevel, expirationTime, userId);
        Token savedToken = tokenRepository.save(token);
        return convertToDTO(savedToken);
    }

    public void deleteToken(UUID tokenId) {
        tokenRepository.deleteById(tokenId);
    }

    public List<TokenDTO> getTokensByUserId(UUID userId) {
        return tokenRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TokenDTO> getTokensByProjectIdAndUserId(UUID projectId,UUID userId) {
        return tokenRepository.findByProjectIdAndUserId(projectId, userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TokenDTO convertToDTO(Token token) {
        return new TokenDTO(token.getId(), token.getProjectId(), token.getAccessLevel(),
                token.getExpirationTime(), token.getUserId());
    }
}

