import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from './services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  
  stats = signal<DashboardStats | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (data: DashboardStats) => {
        this.stats.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando dashboard:', err);
        this.errorMessage.set('Error al cargar las estadísticas del servidor.');
        this.isLoading.set(false);
      }
    });
  }
}