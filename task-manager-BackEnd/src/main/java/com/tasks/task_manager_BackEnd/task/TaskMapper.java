package com.tasks.task_manager_BackEnd.task;

import com.tasks.task_manager_BackEnd.user.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface TaskMapper {

    // Entity -> ResponseDTO
    @Mapping(target = "projectId", source = "project.id")
    TaskResponseDTO toResponseDTO(Task task);

    // RequestDTO -> Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "project", ignore = true)      // Associé dans le Service via projectId
    @Mapping(target = "assignedUser", ignore = true) // Associé dans le Service via assignedUserId
    @Mapping(target = "comments", ignore = true)
    Task toEntity(TaskRequestDTO dto);

    // Update
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "project", ignore = true)
    @Mapping(target = "assignedUser", ignore = true)
    @Mapping(target = "comments", ignore = true)
    void updateEntityFromDto(TaskRequestDTO dto, @MappingTarget Task task);
}