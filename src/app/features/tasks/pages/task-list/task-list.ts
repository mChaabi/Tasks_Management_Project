import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  projectId!: number;

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    if (this.projectId) {
      this.taskService.getTasksByProject(this.projectId).subscribe(data => {
        this.tasks = data;
      });
    }
  }
}