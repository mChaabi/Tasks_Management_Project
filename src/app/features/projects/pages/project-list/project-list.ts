import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss'
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);

  projects: Project[] = [];
  isLoading = true;
  showModal = false;

  projectForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    status: ['PLANNED', [Validators.required]]
  });

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.projectForm.reset({ status: 'PLANNED' });
  }

  createProject(): void {
    if (this.projectForm.invalid) return;

    this.projectService.createProject(this.projectForm.value).subscribe({
      next: (newProject) => {
        this.projects.push(newProject);
        this.closeModal();
      }
    });
  }

  deleteProject(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('¿Deseas eliminar este proyecto?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.projects = this.projects.filter(p => p.id !== id);
        }
      });
    }
  }
}