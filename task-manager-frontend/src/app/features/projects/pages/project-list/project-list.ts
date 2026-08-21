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

  allProjects: Project[] = [];
  projects: Project[] = [];
  isLoading = true;
  showModal = false;
  errorMessage: string | null = null; // affiché à l'utilisateur

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

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
    this.errorMessage = null;
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.allProjects = data;
        this.totalPages = Math.max(1, Math.ceil(this.allProjects.length / this.pageSize));
        this.currentPage = 1;
        this.updatePage();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar proyectos:', err);
        this.errorMessage = `Erreur ${err.status} : impossible de charger les projets.`;
        this.isLoading = false;
      }
    });
  }

  updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.projects = this.allProjects.slice(start, start + this.pageSize);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  nextPage(): void { this.goToPage(this.currentPage + 1); }
  prevPage(): void { this.goToPage(this.currentPage - 1); }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  openModal(): void {
    this.errorMessage = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.projectForm.reset({ status: 'PLANNED' });
  }

  createProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched(); // force l'affichage des erreurs de validation
      return;
    }

    const newProject: Project = { ...this.projectForm.value, ownerId: 1 };

    this.projectService.createProject(newProject).subscribe({
      next: (createdProject) => {
        this.allProjects.push(createdProject);
        this.totalPages = Math.max(1, Math.ceil(this.allProjects.length / this.pageSize));
        this.updatePage();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al crear proyecto:', err);
        this.errorMessage = `Erreur ${err.status} : ${err.error?.message || 'création impossible'}.`;
      }
    });
  }

  deleteProject(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('¿Deseas eliminar este proyecto?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.allProjects = this.allProjects.filter(p => p.id !== id);
          this.totalPages = Math.max(1, Math.ceil(this.allProjects.length / this.pageSize));
          if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
          this.updatePage();
        },
        error: (err) => {
          console.error('Error al eliminar proyecto:', err);
          this.errorMessage = `Erreur ${err.status} : suppression impossible.`;
        }
      });
    }
  }
}