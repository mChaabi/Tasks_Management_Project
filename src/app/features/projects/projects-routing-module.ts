import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './pages/project-list/project-list';
import { ProjectDetailComponent } from './pages/project-detail/project-detail';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: ':id', component: ProjectDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }