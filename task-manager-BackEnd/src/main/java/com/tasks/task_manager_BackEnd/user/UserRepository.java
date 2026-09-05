package com.tasks.task_manager_BackEnd.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Método para buscar usuario por email (útil para autenticación/login)
    Optional<User> findByEmail(String email);

    // Comprobar si ya existe un email
    Boolean existsByEmail(String email);
}
