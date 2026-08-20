package com.tasks.task_manager_BackEnd.user;

public record UserResponseDTO(
        Long id,
        String name,
        String email,
        Role role
) {}