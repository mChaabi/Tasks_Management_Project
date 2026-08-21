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
  showTable = false; // Le tableau reste caché au chargement initial

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
      error: (err) => {
        console.error('Error al cargar proyectos:', err);
        this.isLoading = false;
      }
    });
  }

  openModal(): void {
    this.showTable = true; // Affiche le tableau lors du clic
    this.showModal = true; // Ouvre la fenêtre modale
  }

  closeModal(): void {
    this.showModal = false;
    this.projectForm.reset({ status: 'PLANNED' });
  }

  createProject(): void {
    if (this.projectForm.invalid) return;

    const newProject: Project = {
      ...this.projectForm.value,
      ownerId: 1
    };

    this.projectService.createProject(newProject).subscribe({
      next: (createdProject) => {
        this.projects.push(createdProject);
        this.closeModal();
      },
      error: (err) => console.error('Error al crear proyecto:', err)
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