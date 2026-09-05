package com.tasks.task_manager_BackEnd.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CommentRequestDTO(
        @NotBlank(message = "Le contenu du commentaire ne peut pas être vide")
        @Size(max = 1000, message = "Le commentaire ne peut pas dépasser 1000 caractères")
        String content,

        @NotNull(message = "L'ID de la tâche est obligatoire")
        Long taskId,

        @NotNull(message = "L'ID de l'auteur est obligatoire")
        Long authorId
) {}