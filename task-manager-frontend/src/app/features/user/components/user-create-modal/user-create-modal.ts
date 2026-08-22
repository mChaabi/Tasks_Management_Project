import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { CreateUserDto, Role } from '../../models/user';

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-create-modal.html',
  styleUrl: './user-create-modal.scss'
})
export class UserCreateModalComponent {
  private userService = inject(UserService);

  Role = Role;
  submitting = false;
  errorMessage = '';

  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  newUser: CreateUserDto = {
    name: '',
    email: '',
    password: '',
    role: Role.DEVELOPER
  };

  onSubmit(): void {
    this.submitting = true;
    this.errorMessage = '';

    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.submitting = false;
        if (typeof this.userService.invalidateCache === 'function') {
          this.userService.invalidateCache();
        }
        this.created.emit();
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err?.error?.message || 'Une erreur est survenue lors de la création.';
      }
    });
  }
}