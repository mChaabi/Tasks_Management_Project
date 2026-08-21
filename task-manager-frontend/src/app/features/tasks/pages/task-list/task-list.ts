import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks$: Observable<Task[]> = this.taskService.getAllTasks();
  private cdr = inject(ChangeDetectorRef); // Inyectamos ChangeDetectorRef

  tasks: Task[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data || [];
        this.isLoading = false;
        this.cdr.detectChanges(); // Forzar la actualización visual
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
        this.errorMessage = `Error ${err.status}: no se pudieron cargar las tareas.`;
        this.isLoading = false;
        this.cdr.detectChanges(); // Forzar la actualización visual en error
      }
    });
  }
}