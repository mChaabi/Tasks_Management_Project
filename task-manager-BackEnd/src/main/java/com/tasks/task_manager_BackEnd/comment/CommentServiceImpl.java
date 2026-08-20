package com.tasks.task_manager_BackEnd.comment;

import com.tasks.task_manager_BackEnd.exception.ResourceNotFoundException;
import com.tasks.task_manager_BackEnd.task.Task;
import com.tasks.task_manager_BackEnd.task.TaskRepository;
import com.tasks.task_manager_BackEnd.user.User;
import com.tasks.task_manager_BackEnd.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;

    public CommentServiceImpl(CommentRepository commentRepository, TaskRepository taskRepository,
                              UserRepository userRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.commentMapper = commentMapper;
    }

    @Override
    public CommentResponseDTO createComment(CommentRequestDTO dto) {
        Task task = taskRepository.findById(dto.taskId())
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con ID: " + dto.taskId()));

        User author = userRepository.findById(dto.authorId())
                .orElseThrow(() -> new ResourceNotFoundException("Autor no encontrado con ID: " + dto.authorId()));

        Comment comment = commentMapper.toEntity(dto);
        comment.setTask(task);
        comment.setAuthor(author);

        Comment savedComment = commentRepository.save(comment);
        return commentMapper.toResponseDTO(savedComment);
    }

    @Override
    @Transactional(readOnly = true)
    public CommentResponseDTO getCommentById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentario no encontrado con ID: " + id));
        return commentMapper.toResponseDTO(comment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponseDTO> getCommentsByTask(Long taskId) {
        if (!taskRepository.existsById(taskId)) {
            throw new ResourceNotFoundException("Tarea no encontrada con ID: " + taskId);
        }
        return commentRepository.findByTaskId(taskId).stream()
                .map(commentMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponseDTO> getCommentsByAuthor(Long authorId) {
        if (!userRepository.existsById(authorId)) {
            throw new ResourceNotFoundException("Usuario no encontrado con ID: " + authorId);
        }
        return commentRepository.findByAuthorId(authorId).stream()
                .map(commentMapper::toResponseDTO)
                .toList();
    }

    @Override
    public CommentResponseDTO updateComment(Long id, CommentRequestDTO dto) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentario no encontrado con ID: " + id));

        commentMapper.updateEntityFromDto(dto, comment);
        Comment updatedComment = commentRepository.save(comment);
        return commentMapper.toResponseDTO(updatedComment);
    }

    @Override
    public void deleteComment(Long id) {
        if (!commentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Comentario no encontrado con ID: " + id);
        }
        commentRepository.deleteById(id);
    }
}