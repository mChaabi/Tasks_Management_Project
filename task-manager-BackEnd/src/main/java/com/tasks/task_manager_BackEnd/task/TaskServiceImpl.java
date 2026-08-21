package com.tasks.task_manager_BackEnd.task;

import com.tasks.task_manager_BackEnd.exception.ResourceNotFoundException;
import com.tasks.task_manager_BackEnd.project.Project;
import com.tasks.task_manager_BackEnd.project.ProjectRepository;
import com.tasks.task_manager_BackEnd.user.CurrentUserProvider;
import com.tasks.task_manager_BackEnd.user.User;
import com.tasks.task_manager_BackEnd.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;
    private final CurrentUserProvider currentUserProvider;

    // ⚠️ Le paramètre manquait dans le constructeur d'origine — corrigé ici
    public TaskServiceImpl(TaskRepository taskRepository,
                           ProjectRepository projectRepository,
                           UserRepository userRepository,
                           TaskMapper taskMapper,
                           CurrentUserProvider currentUserProvider) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.taskMapper = taskMapper;
        this.currentUserProvider = currentUserProvider;
    }

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO dto) {
        Project project = projectRepository.findById(dto.projectId())
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + dto.projectId()));

        Task task = taskMapper.toEntity(dto);
        task.setProject(project);

        if (dto.assignedUserId() != null) {
            User assignedUser = userRepository.findById(dto.assignedUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + dto.assignedUserId()));
            task.setAssignedUser(assignedUser);
        }

        Task savedTask = taskRepository.save(task);
        return taskMapper.toResponseDTO(savedTask);
    }

    @Override
    @Transactional(readOnly = true)
    public TaskResponseDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con ID: " + id));
        return taskMapper.toResponseDTO(task);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(taskMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getTasksByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId).stream()
                .map(taskMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getTasksByAssignedUser(Long userId) {
        return taskRepository.findByAssignedUserId(userId).stream()
                .map(taskMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status).stream()
                .map(taskMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getTasksByProjectAndStatus(Long projectId, TaskStatus status) {
        return taskRepository.findByProjectIdAndStatus(projectId, status).stream()
                .map(taskMapper::toResponseDTO)
                .toList();
    }

    @Override
    public TaskResponseDTO updateTaskStatus(Long taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con ID: " + taskId));
        task.setStatus(status);
        return taskMapper.toResponseDTO(taskRepository.save(task));
    }

    @Override
    public TaskResponseDTO assignTaskToUser(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con ID: " + taskId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + userId));

        task.setAssignedUser(user);
        return taskMapper.toResponseDTO(taskRepository.save(task));
    }

    @Override
    public TaskResponseDTO updateTask(Long id, TaskRequestDTO dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con ID: " + id));

        if (!task.getProject().getId().equals(dto.projectId())) {
            Project newProject = projectRepository.findById(dto.projectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + dto.projectId()));
            task.setProject(newProject);
        }

        if (dto.assignedUserId() != null) {
            User assignedUser = userRepository.findById(dto.assignedUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + dto.assignedUserId()));
            task.setAssignedUser(assignedUser);
        } else {
            task.setAssignedUser(null);
        }

        taskMapper.updateEntityFromDto(dto, task);
        Task updatedTask = taskRepository.save(task);
        return taskMapper.toResponseDTO(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Tarea no encontrada con ID: " + id);
        }
        taskRepository.deleteById(id);
    }

    // --- Implémentation des nouvelles méthodes ---

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getTasksForCurrentUser() {
        User currentUser = currentUserProvider.getCurrentUser();
        return taskRepository.findByAssignedUserId(currentUser.getId()).stream()
                .map(taskMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getUrgentTasksForCurrentUser() {
        User currentUser = currentUserProvider.getCurrentUser();
        LocalDate limit = LocalDate.now().plusDays(2); // urgent = échéance <= 48h

        return taskRepository
                .findByAssignedUserIdAndStatusNotAndDueDateLessThanEqual(
                        currentUser.getId(), TaskStatus.COMPLETED, limit)
                .stream()
                .map(taskMapper::toResponseDTO)
                .toList();
    }
}