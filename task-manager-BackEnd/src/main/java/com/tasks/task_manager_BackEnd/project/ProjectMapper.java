package com.tasks.task_manager_BackEnd.project;

import com.tasks.task_manager_BackEnd.user.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ProjectMapper {

    // Entity -> ResponseDTO
    ProjectResponseDTO toResponseDTO(Project project);

    // RequestDTO -> Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "owner", ignore = true) // L'Owner sera associé dans la couche Service via son ownerId
    @Mapping(target = "tasks", ignore = true)
    Project toEntity(ProjectRequestDTO dto);

    // Update
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    void updateEntityFromDto(ProjectRequestDTO dto, @MappingTarget Project project);
}