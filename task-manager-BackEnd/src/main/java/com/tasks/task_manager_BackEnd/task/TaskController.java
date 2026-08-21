package com.tasks.task_manager_BackEnd.task;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskRequestDTO dto) {
        return ResponseEntity.ok(taskService.createTask(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TaskResponseDTO>> getTasksByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(taskService.getTasksByProject(projectId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskResponseDTO>> getTasksByAssignedUser(@PathVariable Long userId) {
        return ResponseEntity.ok(taskService.getTasksByAssignedUser(userId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<TaskResponseDTO>> getTasksByStatus(@PathVariable TaskStatus status) {
        return ResponseEntity.ok(taskService.getTasksByStatus(status));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskResponseDTO> updateTaskStatus(@PathVariable Long id, @RequestParam TaskStatus status) {
        return ResponseEntity.ok(taskService.updateTaskStatus(id, status));
    }

    @PatchMapping("/{id}/assign")
    public ResponseEntity<TaskResponseDTO> assignTaskToUser(@PathVariable Long id, @RequestParam Long userId) {
        return ResponseEntity.ok(taskService.assignTaskToUser(id, userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> updateTask(@PathVariable Long id, @RequestBody TaskRequestDTO dto) {
        return ResponseEntity.ok(taskService.updateTask(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    // --- Endpoints navbar / calendrier / notifications ---

    @GetMapping("/me")
    public ResponseEntity<List<TaskResponseDTO>> getMyTasks() {
        return ResponseEntity.ok(taskService.getTasksForCurrentUser());
    }

    @GetMapping("/me/urgent")
    public ResponseEntity<List<TaskResponseDTO>> getMyUrgentTasks() {
        return ResponseEntity.ok(taskService.getUrgentTasksForCurrentUser());
    }
}