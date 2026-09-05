package com.tasks.task_manager_BackEnd.task;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record TaskRequestDTO(
        @NotBlank(message = "Le titre de la tâche est obligatoire")
        @Size(min = 3, max = 150, message = "Le titre doit contenir entre 3 et 150 caractères")
        String title,

        @Size(max = 1000, message = "La description ne peut pas dépasser 1000 caractères")
        String description,

        TaskStatus status,

        @FutureOrPresent(message = "La date d'échéance ne peut pas être dans le passé")
        LocalDate dueDate,

        @NotNull(message = "L'ID du projet est obligatoire")
        Long projectId,

        Long assignedUserId
) {}