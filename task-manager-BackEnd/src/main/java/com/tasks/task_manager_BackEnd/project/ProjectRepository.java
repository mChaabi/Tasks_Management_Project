package com.tasks.task_manager_BackEnd.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // Obtener todos los proyectos de un usuario específico
    List<Project> findByOwnerId(Long userId);
}