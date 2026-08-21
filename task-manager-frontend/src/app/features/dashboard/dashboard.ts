import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from './services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  
  stats = signal<DashboardStats | null>(null);
  isLoading = signal<boolean>(true); // Declared as a signal

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.stats.set(data);
        this.isLoading.set(false); // FIXED: No () before .set()
      },
      error: (err) => {
        console.error('Error dashboard:', err);
        this.isLoading.set(false); // FIXED: No () before .set()
      }
    });
  }
}