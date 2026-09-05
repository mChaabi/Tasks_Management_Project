import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { AuthService } from '../../../core/services/auth';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly API_URL = 'http://localhost:8080/api/projects';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Ajusta según tu AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.API_URL, { headers: this.getHeaders() });
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.API_URL, project, { headers: this.getHeaders() });
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.API_URL}/${id}`, project, { headers: this.getHeaders() });
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }

  // Export Excel
downloadExcel(): Observable<Blob> {
  return this.http.get(`${this.API_URL}/export/excel`, { responseType: 'blob' });
}

// Export PDF
downloadPdf(): Observable<Blob> {
  return this.http.get(`${this.API_URL}/export/pdf`, { responseType: 'blob' });
}

// Import Excel
uploadExcel(file: File): Observable<Project[]> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<Project[]>(`${this.API_URL}/import`, formData);
}
}