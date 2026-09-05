// projects-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './pages/project-list/project-list';
import { ProjectDetailComponent } from './pages/project-detail/project-detail';
import { TaskBoardComponent } from '../tasks/pages/task-board/task-board';

const routes: Routes = [
  { 
    path: '', 
    component: ProjectListComponent 
  },
  { 
    path: ':id/tasks', // 👈 Las sub-rutas específicas deben ir ANTES de :id
    component: TaskBoardComponent 
  },
  { 
    path: ':id', // 👈 Ruta del detalle del proyecto
    component: ProjectDetailComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }