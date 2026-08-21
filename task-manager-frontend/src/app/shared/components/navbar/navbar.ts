// navbar.ts
import { Component, inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { NotificationService } from '../services/notification';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  notificationService = inject(NotificationService);

  showToolsMenu = false;
  showNotifPanel = false;

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.notificationService.startPolling();
    }
  }

  ngOnDestroy(): void {
    this.notificationService.stopPolling();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleToolsMenu(): void {
    this.showToolsMenu = !this.showToolsMenu;
    this.showNotifPanel = false;
  }

  goToCalendar(): void {
    this.showToolsMenu = false;
    this.router.navigate(['/calendar']);
  }

  openNotifications(): void {
    this.showToolsMenu = false;
    this.notificationService.refresh();
    this.showNotifPanel = true;
  }

  closeNotifPanel(): void {
    this.showNotifPanel = false;
  }

  goToTaskProject(projectId: number): void {
    this.showNotifPanel = false;
    this.router.navigate(['/projects', projectId]);
  }

  // Ferme les menus si on clique en dehors
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.tools-dropdown') && !target.closest('.notif-panel-wrapper')) {
      this.showToolsMenu = false;
      this.showNotifPanel = false;
    }
  }

  logout(): void {
    this.notificationService.stopPolling();
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}