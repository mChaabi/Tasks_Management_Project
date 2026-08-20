package com.tasks.task_manager_BackEnd.comment;

import java.util.List;

public interface CommentService {
    CommentResponseDTO createComment(CommentRequestDTO dto);
    CommentResponseDTO getCommentById(Long id);
    List<CommentResponseDTO> getCommentsByTask(Long taskId);
    List<CommentResponseDTO> getCommentsByAuthor(Long authorId);
    CommentResponseDTO updateComment(Long id, CommentRequestDTO dto);
    void deleteComment(Long id);
}