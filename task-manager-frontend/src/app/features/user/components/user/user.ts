// src/app/features/users/components/users-list/users-list.component.ts
import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal';
import { UserService } from '../../services/user';
import { Role, User } from '../../models/user';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserCreateModalComponent],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class UsersListComponent implements OnInit {
  private userService = inject(UserService);

  users: User[] = [];
  loading = true;
  error = false;
  searchTerm = '';
  showCreateModal = false;

  // Pagination
  currentPage = 1;
  pageSize = 5;

  hoveredId: number | null = null;
  pinnedId: number | null = null;
  private loadedDetailIds = new Set<number>();
  loadingDetailId: number | null = null;

  readonly skeletonArray = Array.from({ length: 5 });

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.error = false;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  get filteredUsers(): User[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.users;
    return this.users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        this.roleLabel(u.role).toLowerCase().includes(term)
    );
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  onUserCreated(): void {
    this.showCreateModal = false;
    this.fetchUsers();
  }

  isExpanded(id: number): boolean {
    return this.hoveredId === id || this.pinnedId === id;
  }

  onHover(id: number): void {
    this.hoveredId = id;
    this.loadDetailIfNeeded(id);
  }

  onLeave(): void {
    this.hoveredId = null;
  }

  togglePin(id: number, event?: Event): void {
    event?.stopPropagation();
    this.pinnedId = this.pinnedId === id ? null : id;
    if (this.pinnedId) this.loadDetailIfNeeded(id);
  }

  private loadDetailIfNeeded(id: number): void {
    if (this.loadedDetailIds.has(id)) return;
    this.loadingDetailId = id;
    this.userService.getUserDetail(id).subscribe({
      next: (detail) => {
        const target = this.users.find((u) => u.id === id);
        if (target) {
          target.projects = detail.projects ?? [];
          target.tasks = detail.tasks ?? [];
          target.projectsCount = detail.projectsCount ?? target.projects.length;
          target.tasksCount = detail.tasksCount ?? target.tasks.length;
        }
        this.loadedDetailIds.add(id);
        this.loadingDetailId = null;
      },
      error: () => {
        this.loadingDetailId = null;
      }
    });
  }

  initials(name: string): string {
    return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');
  }

  roleLabel(role: Role): string {
    switch (role) {
      case Role.ADMIN: return 'Admin';
      case Role.MANAGER: return 'Manager';
      case Role.DEVELOPER: default: return 'Développeur';
    }
  }

  roleColor(role: Role): string {
    switch (role) {
      case Role.ADMIN: return '#f59e0b';
      case Role.MANAGER: return '#22d3ee';
      case Role.DEVELOPER: default: return '#6366f1';
    }
  }

  statusClass(status: string | undefined): string {
    return `status-${(status ?? '').toLowerCase()}`;
  }
}