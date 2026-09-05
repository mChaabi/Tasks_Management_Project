package com.tasks.task_manager_BackEnd.user;

import java.util.List;

public interface UserService {
    UserResponseDTO createUser(UserRequestDTO dto);
    UserResponseDTO getUserById(Long id);
    UserResponseDTO getUserByEmail(String email);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO updateUser(Long id, UserRequestDTO dto);
    void deleteUser(Long id);
}