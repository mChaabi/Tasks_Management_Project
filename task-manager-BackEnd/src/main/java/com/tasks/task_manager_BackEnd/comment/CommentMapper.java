package com.tasks.task_manager_BackEnd.comment;

import com.tasks.task_manager_BackEnd.user.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface CommentMapper {

    // Entity -> ResponseDTO
    @Mapping(target = "taskId", source = "task.id")
    CommentResponseDTO toResponseDTO(Comment comment);

    // RequestDTO -> Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "task", ignore = true)   // Associé dans le Service via taskId
    @Mapping(target = "author", ignore = true) // Associé dans le Service via authorId
    Comment toEntity(CommentRequestDTO dto);

    // Update
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "task", ignore = true)
    @Mapping(target = "author", ignore = true)
    void updateEntityFromDto(CommentRequestDTO dto, @MappingTarget Comment comment);
}