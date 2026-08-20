package com.tasks.task_manager_BackEnd.auth;

import com.tasks.task_manager_BackEnd.user.CustomUserDetailsService;
import com.tasks.task_manager_BackEnd.user.UserRequestDTO;
import com.tasks.task_manager_BackEnd.user.UserResponseDTO;
import com.tasks.task_manager_BackEnd.user.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;

    public AuthService(UserService userService, AuthenticationManager authenticationManager,
                       CustomUserDetailsService userDetailsService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtils = jwtUtils;
    }

    public UserResponseDTO register(UserRequestDTO dto) {
        return userService.createUser(dto);
    }

    public AuthResponseDTO login(LoginRequestDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.password())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(dto.email());
        String token = jwtUtils.generateToken(userDetails);
        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        return new AuthResponseDTO(token, userDetails.getUsername(), role);
    }
}