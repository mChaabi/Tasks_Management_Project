package com.tasks.task_manager_BackEnd.project;

import com.tasks.task_manager_BackEnd.user.UserResponseDTO;
import java.time.LocalDateTime;

public record ProjectResponseDTO(
        Long id,
        String title,
        String description,
        LocalDateTime createdAt,
        UserResponseDTO owner
) {}