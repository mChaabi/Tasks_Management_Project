import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  totalComments: number;
  totalUsers: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  // Utilise le chemin relatif s'il y a un proxy ou l'URL backend complète
  private readonly API_URL = 'http://localhost:8080/api/dashboard/stats';

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.API_URL);
  }
}