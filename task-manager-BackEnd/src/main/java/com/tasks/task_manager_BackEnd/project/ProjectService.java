package com.tasks.task_manager_BackEnd.project;

import java.util.List;

public interface ProjectService {
    ProjectResponseDTO createProject(ProjectRequestDTO dto);
    ProjectResponseDTO getProjectById(Long id);
    List<ProjectResponseDTO> getAllProjects();
    List<ProjectResponseDTO> getProjectsByOwner(Long ownerId);
    ProjectResponseDTO updateProject(Long id, ProjectRequestDTO dto);
    void deleteProject(Long id);
}