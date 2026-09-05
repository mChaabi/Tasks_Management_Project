package com.tasks.task_manager_BackEnd.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @NotBlank @Email String email,
        @NotBlank String password
) {}