export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: number;
  createdAt?: string;
}