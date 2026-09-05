// core/services/notification.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { TaskService } from '../../../features/tasks/services/task';
import { Task } from '../../../features/tasks/models/task.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private taskService = inject(TaskService);
  private pollingSub?: Subscription;

  private allTasks = signal<Task[]>([]);

  // Une tâche est "urgente" si non terminée et échéance <= 48h (ou déjà en retard)
  urgentTasks = computed(() =>
    this.allTasks().filter(t => this.isUrgent(t))
  );

  overdueTasks = computed(() =>
    this.allTasks().filter(t => this.isOverdue(t))
  );

  urgentCount = computed(() => this.urgentTasks().length);

  isUrgent(task: Task): boolean {
    if (!task.dueDate || task.status === 'COMPLETED') return false;
    const due = new Date(task.dueDate).getTime();
    const now = Date.now();
    const diffHours = (due - now) / (1000 * 60 * 60);
    return diffHours <= 48; // urgente si <= 48h restantes (inclut retard)
  }

  isOverdue(task: Task): boolean {
    if (!task.dueDate || task.status === 'COMPLETED') return false;
    return new Date(task.dueDate).getTime() < Date.now();
  }

  refresh(): void {
    this.taskService.getAllTasksForUser().subscribe({
      next: (tasks) => this.allTasks.set(tasks),
      error: (err) => console.error('Error al cargar notificaciones:', err)
    });
  }

  startPolling(intervalMs = 5 * 60 * 1000): void {
    this.refresh();
    this.pollingSub = interval(intervalMs).subscribe(() => this.refresh());
  }

  stopPolling(): void {
    this.pollingSub?.unsubscribe();
  }
}