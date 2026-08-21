package com.tasks.task_manager_BackEnd.task;

import java.util.List;

public interface TaskService {
    TaskResponseDTO createTask(TaskRequestDTO dto);
    TaskResponseDTO getTaskById(Long id);
    List<TaskResponseDTO> getAllTasks();
    List<TaskResponseDTO> getTasksByProject(Long projectId);
    List<TaskResponseDTO> getTasksByAssignedUser(Long userId);
    List<TaskResponseDTO> getTasksByStatus(TaskStatus status);
    List<TaskResponseDTO> getTasksByProjectAndStatus(Long projectId, TaskStatus status);
    TaskResponseDTO updateTaskStatus(Long taskId, TaskStatus status);
    TaskResponseDTO assignTaskToUser(Long taskId, Long userId);
    TaskResponseDTO updateTask(Long id, TaskRequestDTO dto);
    List<TaskResponseDTO> getTasksForCurrentUser();
    List<TaskResponseDTO> getUrgentTasksForCurrentUser();
    void deleteTask(Long id);
}