export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

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
  dueDate?: string;
  projectId: number;
  projectTitle?: string | null;
  assignedUser?: AssignedUser;
  createdAt?: string;
}