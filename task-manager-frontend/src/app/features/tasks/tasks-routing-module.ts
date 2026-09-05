import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskBoardComponent } from './pages/task-board/task-board';
import { TaskListComponent } from './pages/task-list/task-list';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'board', component: TaskBoardComponent }, // sin projectId obligatorio
  { path: 'list', component: TaskListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }