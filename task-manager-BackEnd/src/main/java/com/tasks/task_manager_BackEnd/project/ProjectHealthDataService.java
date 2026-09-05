package com.tasks.task_manager_BackEnd.project;

import com.tasks.task_manager_BackEnd.task.Task;
import com.tasks.task_manager_BackEnd.task.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectHealthDataService {

    private final TaskRepository taskRepository;

    public ProjectHealthInput buildInput(Long projectId) {
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        LocalDate today = LocalDate.now();

        long total = tasks.size();
        long overdue = tasks.stream()
                .filter(t -> t.getDueDate() != null
                        && t.getDueDate().isBefore(today)
                        && !"COMPLETED".equals(t.getStatus()))
                .count();
        long inProgress = tasks.stream().filter(t -> "IN_PROGRESS".equals(t.getStatus())).count();
        long completed = tasks.stream().filter(t -> "COMPLETED".equals(t.getStatus())).count();

        // Tareas "atascadas": in progress hace más de 5 días sin cambio
        long stale = tasks.stream()
                .filter(t -> "IN_PROGRESS".equals(t.getStatus())
                        && t.getCreatedAt() != null
                        && t.getCreatedAt().isBefore(LocalDateTime.now().minusDays(5)))
                .count();

        return new ProjectHealthInput(total, overdue, inProgress, completed, stale);
    }
}
