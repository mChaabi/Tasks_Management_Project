// features/projects/services/project-health.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectHealthScore } from '../models/project-health';

@Injectable({ providedIn: 'root' })
export class ProjectHealthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/projects';

  getHealth(projectId: number): Observable<ProjectHealthScore> {
    return this.http.get<ProjectHealthScore>(`${this.baseUrl}/${projectId}/health`);
  }
}