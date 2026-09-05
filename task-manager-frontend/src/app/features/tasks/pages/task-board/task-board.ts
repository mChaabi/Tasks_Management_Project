import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task, TaskStatus } from '../../models/task.model';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../projects/models/project.model';
import { ProjectService } from '../../../projects/services/project';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslatePipe], // ← FormsModule añadido
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss'
})
export class TaskBoardComponent implements OnInit {
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  @Input() projectId!: number;
  tasks: Task[] = [];
  showModal = false;

  projects: Project[] = [];
  selectedProjectId: number | null = null;

  users: string[] = ['Zaid', 'Mohamed', 'Alice Manager', 'Bruno Manager', 'Carla Developer']; // ← nuevo

  editingTaskId: number | null = null; // ← nuevo, null = modo crear

  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    status: ['PENDING', [Validators.required]],
    priority: ['MEDIA', [Validators.required]],   // ← nuevo
    dueDate: [''],                                 // ← nuevo
    assignedTo: ['']                               // ← nuevo
  });

  ngOnInit(): void {
    if (!this.projectId) {
      const idFromRoute = Number(this.route.snapshot.paramMap.get('projectId'));
      if (idFromRoute) {
        this.projectId = idFromRoute;
        this.selectedProjectId = idFromRoute;
      }
    }

    this.projectService.getAllProjects().subscribe(p => {
      this.projects = p;
      if (!this.projectId && p.length > 0 && p[0].id != null) {
        this.selectedProjectId = p[0].id;
        this.projectId = p[0].id;
      }
      if (this.projectId) {
        this.loadTasks();
      }
    });
  }

  onProjectChange(id: number): void {   // ← nuevo
    this.projectId = Number(id);
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (data) => {
        this.tasks = data || [];
      },
      error: (err) => console.error('Error al cargar tareas:', err)
    });
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }

  changeStatus(taskId: number, newStatus: TaskStatus): void {
    this.taskService.updateTaskStatus(taskId, newStatus).subscribe((updated) => {
      const index = this.tasks.findIndex((t) => t.id === taskId);
      if (index !== -1) this.tasks[index] = updated;
    });
  }

  // ← nuevo: decide crear o editar
  saveTask(): void {
    if (this.taskForm.invalid) return;

    if (this.editingTaskId) {
      const changes = this.taskForm.value;
      this.taskService.updateTask(this.editingTaskId, changes).subscribe((updated) => {
        const index = this.tasks.findIndex((t) => t.id === this.editingTaskId);
        if (index !== -1) this.tasks[index] = updated;
        this.closeModal();
      });
    } else {
      const newTask: Task = {
        ...this.taskForm.value,
        projectId: this.projectId
      };
      this.taskService.createTask(newTask).subscribe((created) => {
        this.tasks.push(created);
        this.closeModal();
      });
    }
  }

  deleteTask(id: number): void {
    if (confirm('¿Eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter((t) => t.id !== id);
      });
    }
  }

  openModal(): void {
    this.editingTaskId = null;
    this.taskForm.reset({ status: 'PENDING', priority: 'MEDIA' });
    this.showModal = true;
  }

  openEditModal(task: Task): void {   // ← nuevo
    this.editingTaskId = task.id ?? null;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority || 'MEDIA',
      dueDate: task.dueDate || '',
      assignedTo: task.assignedTo || ''
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingTaskId = null;
    this.taskForm.reset({ status: 'PENDING', priority: 'MEDIA' });
  }
}