package com.tasks.task_manager_BackEnd.task;

import com.tasks.task_manager_BackEnd.user.UserResponseDTO;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record TaskResponseDTO(
        Long id,
        String title,
        String description,
        TaskStatus status,
        LocalDate dueDate,
        LocalDateTime createdAt,
        Long projectId,
        UserResponseDTO assignedUser
) {}