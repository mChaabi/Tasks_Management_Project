// shared/components/health-score-card/health-score-card.ts
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  TranslatePipe } from '@ngx-translate/core';
import { ProjectHealthService } from '../../../features/projects/services/project-health';
import { ProjectHealthScore } from '../../../features/projects/models/project-health';

@Component({
  selector: 'app-health-score-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-score-card.html',
  styleUrl: './health-score-card.scss'
})
export class HealthScoreCardComponent implements OnInit {
  @Input({ required: true }) projectId!: number;

  private healthService = inject(ProjectHealthService);

  health = signal<ProjectHealthScore | null>(null);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.healthService.getHealth(this.projectId).subscribe({
      next: (data) => {
        this.health.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('PROJECTS.HEALTH.LOAD_ERROR');
        this.isLoading.set(false);
      }
    });
  }

  riskClass(): string {
    return this.health()?.riskLevel.toLowerCase() ?? '';
  }
}