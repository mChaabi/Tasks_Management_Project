package com.tasks.task_manager_BackEnd.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Obtener todas las tareas asociadas a un proyecto
    List<Task> findByProjectId(Long projectId);

    // Obtener todas las tareas asignadas a un usuario
    List<Task> findByAssignedUserId(Long userId);

    // Obtener tareas por estado (PENDING, IN_PROGRESS, COMPLETED)
    List<Task> findByStatus(TaskStatus status);

    // Obtener tareas de un proyecto filtradas por estado
    List<Task> findByProjectIdAndStatus(Long projectId, TaskStatus status);
}