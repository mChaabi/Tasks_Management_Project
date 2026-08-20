package com.tasks.task_manager_BackEnd.project;

import com.tasks.task_manager_BackEnd.exception.ResourceNotFoundException;
import com.tasks.task_manager_BackEnd.user.User;
import com.tasks.task_manager_BackEnd.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMapper projectMapper;

    public ProjectServiceImpl(ProjectRepository projectRepository, UserRepository userRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.projectMapper = projectMapper;
    }

    @Override
    public ProjectResponseDTO createProject(ProjectRequestDTO dto) {
        User owner = userRepository.findById(dto.ownerId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario creador no encontrado con ID: " + dto.ownerId()));

        Project project = projectMapper.toEntity(dto);
        project.setOwner(owner);

        Project savedProject = projectRepository.save(project);
        return projectMapper.toResponseDTO(savedProject);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponseDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + id));
        return projectMapper.toResponseDTO(project);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponseDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(projectMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponseDTO> getProjectsByOwner(Long ownerId) {
        if (!userRepository.existsById(ownerId)) {
            throw new ResourceNotFoundException("Usuario no encontrado con ID: " + ownerId);
        }
        return projectRepository.findByOwnerId(ownerId).stream()
                .map(projectMapper::toResponseDTO)
                .toList();
    }

    @Override
    public ProjectResponseDTO updateProject(Long id, ProjectRequestDTO dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + id));

        if (!project.getOwner().getId().equals(dto.ownerId())) {
            User newOwner = userRepository.findById(dto.ownerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Nuevo propietario no encontrado con ID: " + dto.ownerId()));
            project.setOwner(newOwner);
        }

        projectMapper.updateEntityFromDto(dto, project);
        Project updatedProject = projectRepository.save(project);
        return projectMapper.toResponseDTO(updatedProject);
    }

    @Override
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Proyecto no encontrado con ID: " + id);
        }
        projectRepository.deleteById(id);
    }
}