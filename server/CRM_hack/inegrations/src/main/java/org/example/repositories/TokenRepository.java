package org.example.repositories;

import org.example.model.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TokenRepository extends JpaRepository<Token, UUID> {
    List<Token> findByUserId(UUID userId);
    List<Token> findByProjectIdAndUserId(UUID projectId, UUID userId);
}

