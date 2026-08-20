package com.tasks.task_manager_BackEnd.comment;

import com.tasks.task_manager_BackEnd.user.UserResponseDTO;
import java.time.LocalDateTime;

public record CommentResponseDTO(
        Long id,
        String content,
        LocalDateTime createdAt,
        Long taskId,
        UserResponseDTO author
) {}