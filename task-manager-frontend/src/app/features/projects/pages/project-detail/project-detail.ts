import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project';
import { Project } from '../../models/project.model';
import { TaskBoardComponent } from '../../../tasks/pages/task-board/task-board';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskBoardComponent],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss'
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  project: Project | null = null;
  isLoading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.projectService.getProjectById(id).subscribe({
        next: (data) => {
          this.project = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar el proyecto:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }
}