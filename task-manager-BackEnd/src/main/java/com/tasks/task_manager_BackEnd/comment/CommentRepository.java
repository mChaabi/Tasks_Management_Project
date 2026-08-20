package com.tasks.task_manager_BackEnd.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Obtener todos los comentarios de una tarea específica
    List<Comment> findByTaskId(Long taskId);

    // Obtener todos los comentarios creados por un usuario
    List<Comment> findByAuthorId(Long userId);
}