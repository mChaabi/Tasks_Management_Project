// src/app/features/users/models/user.model.ts

/**
 * Doit correspondre exactement à l'enum Role côté backend
 * (package com.tasks.task_manager_BackEnd.user.Role)
 */
export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DEVELOPER = 'DEVELOPER'
}

export interface ProjectSummary {
  id: number;
  name: string;
  status?: string;
}

export interface TaskSummary {
  id: number;
  title: string;
  status: string;
  dueDate?: string;
}

/**
 * DTO utilisateur tel que renvoyé par GET /api/users et GET /api/users/{id}.
 * projects / tasks peuvent être omis dans la liste et chargés seulement
 * au clic/hover (voir UserService.getUserDetail).
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  projects?: ProjectSummary[];
  tasks?: TaskSummary[];
  projectsCount?: number;
  tasksCount?: number;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password?: string;
  role: Role;
}
