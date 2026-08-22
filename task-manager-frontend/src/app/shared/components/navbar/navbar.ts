import { Component, inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth';
import { NotificationService } from '../services/notification';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    ThemeToggleComponent,
    LanguageSwitcherComponent
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  notificationService = inject(NotificationService);

  showToolsMenu = false;
  showUsersMenu = false;
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

  canSeeUsers(): boolean {
    return true;
  }

  toggleToolsMenu(): void {
    this.showToolsMenu = !this.showToolsMenu;
    this.showUsersMenu = false;
    this.showNotifPanel = false;
  }

  toggleUsersMenu(): void {
    this.showUsersMenu = !this.showUsersMenu;
    this.showToolsMenu = false;
    this.showNotifPanel = false;
  }

  goToUsersList(): void {
    this.showUsersMenu = false;
    this.router.navigate(['/users']);
  }

  openAddUserModal(): void {
    this.showUsersMenu = false;
    this.router.navigate(['/users'], { queryParams: { action: 'create' } });
  }

  goToDashboard(): void {
    this.showToolsMenu = false;
    this.router.navigate(['/dashboard']);
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.tools-dropdown') && !target.closest('.notif-panel-wrapper')) {
      this.showToolsMenu = false;
      this.showUsersMenu = false;
      this.showNotifPanel = false;
    }
  }

  logout(): void {
    this.notificationService.stopPolling();
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}