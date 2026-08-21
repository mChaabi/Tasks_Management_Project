package com.tasks.task_manager_BackEnd.dashbord;

import com.tasks.task_manager_BackEnd.comment.CommentRepository;
import com.tasks.task_manager_BackEnd.project.ProjectRepository;
import com.tasks.task_manager_BackEnd.task.TaskRepository;
import com.tasks.task_manager_BackEnd.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @GetMapping("/stats")
    public ResponseEntity<com.tasks.task_manager_BackEnd.dto.DashboardStatsDTO> getStats() {
        com.tasks.task_manager_BackEnd.dto.DashboardStatsDTO stats = com.tasks.task_manager_BackEnd.dto.DashboardStatsDTO.builder()
                .totalProjects(projectRepository.count())
                .totalTasks(taskRepository.count())
                .totalComments(commentRepository.count())
                .totalUsers(userRepository.count())
                .build();

        return ResponseEntity.ok(stats);
    }
}