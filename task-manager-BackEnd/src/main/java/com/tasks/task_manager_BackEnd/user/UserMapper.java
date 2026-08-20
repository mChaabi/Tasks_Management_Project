package com.tasks.task_manager_BackEnd.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    // Entity -> ResponseDTO
    UserResponseDTO toResponseDTO(User user);

    // RequestDTO -> Entity (pour la création)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "projects", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "comments", ignore = true)
    User toEntity(UserRequestDTO dto);

    // Mise à jour de l'entité existante à partir du DTO
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "projects", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "comments", ignore = true)
    void updateEntityFromDto(UserRequestDTO dto, @MappingTarget User user);
}