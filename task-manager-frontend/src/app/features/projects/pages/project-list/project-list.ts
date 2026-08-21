import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project';
import { Project } from '../../models/project.model';
import { ExportService } from '../../../../services/export';

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
  private exportService = inject(ExportService);

  allProjects: Project[] = [];
  projects: Project[] = [];
  isLoading = true;
  showModal = false;
  errorMessage: string | null = null; // affiché à l'utilisateur
  editingProject: Project | null = null;

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

  exportExcel(): void {
    this.exportService.exportToExcel(this.allProjects);
  }
  exportPdf(): void {
    this.exportService.exportToPdf(this.allProjects);
  }


  // Importar desde archivo Excel
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.exportService.importFromExcel(file).then((importedProjects) => {
        // Enviar cada proyecto al backend o procesarlos en masa
        importedProjects.forEach((proj) => {
          const newProj: Project = {
            title: proj.title || 'Sin Título',
            description: proj.description || '',
            status: proj.status || 'PLANNED',
            ownerId: 1
          };
          this.projectService.createProject(newProj).subscribe({
            next: (created) => {
              this.allProjects.push(created);
              this.updatePage();
            }
          });
        });
      }).catch(err => {
        console.error('Error al importar:', err);
        this.errorMessage = 'El archivo Excel no tiene un formato válido.';
      });
    }
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

  openEditModal(project: Project, event: Event): void {
  event.stopPropagation();
  this.editingProject = project;
  this.errorMessage = null;
  this.projectForm.patchValue({
    title: project.title,
    description: project.description,
    status: project.status || 'PLANNED'
  });
  this.showModal = true;
}

 openModal(): void {
  this.editingProject = null;
  this.errorMessage = null;
  this.showModal = true;
}

  closeModal(): void {
  this.showModal = false;
  this.editingProject = null;
  this.projectForm.reset({ status: 'PLANNED' });
}
  

saveProject(): void {
  if (this.projectForm.invalid) {
    this.projectForm.markAllAsTouched();
    return;
  }

  if (this.editingProject) {
    // --- Modo edición ---
    const updated: Project = {
      ...this.projectForm.value,
      ownerId: this.editingProject.ownerId
    };

    this.projectService.updateProject(this.editingProject.id!, updated).subscribe({
      next: (result) => {
        const idx = this.allProjects.findIndex(p => p.id === this.editingProject!.id);
        if (idx !== -1) this.allProjects[idx] = result;
        this.updatePage();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al editar proyecto:', err);
        this.errorMessage = `Error ${err.status}: ${err.error?.message || 'edición no permitida'}.`;
      }
    });
  } else {
    // --- Modo creación ---
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
        this.errorMessage = `Error ${err.status}: ${err.error?.message || 'creación imposible'}.`;
      }
    });
  }
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