package com.tasks.task_manager_BackEnd.config;

import com.tasks.task_manager_BackEnd.user.Role;
import com.tasks.task_manager_BackEnd.user.User;
import com.tasks.task_manager_BackEnd.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner seedUsers() {
        return args -> {
            if (userRepository.count() > 0) return; // évite les doublons au redémarrage

            createUser("Alice Manager", "alice.manager@test.com", Role.MANAGER);
            createUser("Bruno Manager", "bruno.manager@test.com", Role.MANAGER);
            createUser("Carla Developer", "carla.dev@test.com", Role.DEVELOPER);
            createUser("David Developer", "david.dev@test.com", Role.DEVELOPER);
            createUser("Eva User", "eva.user@test.com", Role.USER);
            createUser("Farid User", "farid.user@test.com", Role.USER);
        };
    }

    private void createUser(String name, String email, Role role) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode("Password123!"));
        user.setRole(role);
        userRepository.save(user);
    }
}