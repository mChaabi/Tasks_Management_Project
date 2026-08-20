import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss'
})
export class TaskBoardComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);

  projectId!: number;
  tasks: Task[] = [];
  showModal = false;

  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    status: ['TODO', [Validators.required]]
  });

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    if (this.projectId) {
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.taskService.getTasksByProject(this.projectId).subscribe(data => {
      this.tasks = data;
    });
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  changeStatus(taskId: number, newStatus: TaskStatus): void {
    this.taskService.updateTaskStatus(taskId, newStatus).subscribe(updated => {
      const index = this.tasks.findIndex(t => t.id === taskId);
      if (index !== -1) this.tasks[index] = updated;
    });
  }

  createTask(): void {
    if (this.taskForm.invalid) return;
    const newTask: Task = {
      ...this.taskForm.value,
      projectId: this.projectId
    };

    this.taskService.createTask(newTask).subscribe(created => {
      this.tasks.push(created);
      this.closeModal();
    });
  }

  deleteTask(id: number): void {
    if (confirm('¿Eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      });
    }
  }

  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; this.taskForm.reset({ status: 'TODO' }); }
}