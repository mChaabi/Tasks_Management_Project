import { User } from "../../user/models/user";

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export interface AssignedUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority?: TaskPriority;      // ← nuevo
  dueDate?: string;             // ← nuevo
  assignedTo?: string;          // ← nuevo
  projectId: number;
  assignedUser?: User | null;
}