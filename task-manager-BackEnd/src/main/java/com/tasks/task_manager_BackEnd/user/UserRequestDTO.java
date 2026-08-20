package com.tasks.task_manager_BackEnd.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(
        @NotBlank(message = "Le nom ne peut pas être vide")
        @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
        String name,

        @NotBlank(message = "L'adresse email est obligatoire")
        @Email(message = "L'adresse email doit être valide")
        String email,

        @NotBlank(message = "Le mot de passe est obligatoire")
        @Size(min = 8, max = 100, message = "Le mot de passe doit contenir au moins 8 caractères")
        String password,

        Role role
) {}