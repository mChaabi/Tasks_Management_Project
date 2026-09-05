import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project';
import { Project } from '../../models/project.model';
import { TaskBoardComponent } from '../../../tasks/pages/task-board/task-board';
import { HealthScoreCardComponent } from '../../../../shared/components/health-score-card/health-score-card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TaskBoardComponent,
    TranslatePipe, // 👈 Reemplazado TranslatePipe por TranslateModule
    HealthScoreCardComponent
  ],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss'
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  constructor() {
  console.log('✅ ProjectDetailComponent cargado exitosamente por el Router!');
}

  project: Project | null = null;
  isLoading = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const rawId = params.get('id');
      const id = rawId ? Number(rawId) : null;

      if (id && !isNaN(id)) {
        this.loadProject(id);
      } else {
        this.isLoading = false;
        this.project = null;
      }
    });
  }

  private loadProject(id: number): void {
    this.isLoading = true;
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar el proyecto:', err);
        this.project = null;
        this.isLoading = false;
      }
    });
  }
}