package com.tasks.task_manager_BackEnd.comment;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<CommentResponseDTO> createComment(@Valid @RequestBody CommentRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createComment(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentResponseDTO> getCommentById(@PathVariable Long id) {
        return ResponseEntity.ok(commentService.getCommentById(id));
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<CommentResponseDTO>> getCommentsByTask(@PathVariable Long taskId) {
        return ResponseEntity.ok(commentService.getCommentsByTask(taskId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentResponseDTO> updateComment(@PathVariable Long id, @Valid @RequestBody CommentRequestDTO dto) {
        return ResponseEntity.ok(commentService.updateComment(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}