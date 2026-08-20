package com.tasks.task_manager_BackEnd.auth;

public record AuthResponseDTO(
        String token,
        String email,
        String role
) {}