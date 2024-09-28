package org.example.services;

import org.example.models.entities.User;
import org.example.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUserByName(String name) { return userRepository.findByName(name).orElse(null); }

    public User getUserByAuthId(UUID authId) { return userRepository.findByAuthId(authId).orElse(null); }
}
