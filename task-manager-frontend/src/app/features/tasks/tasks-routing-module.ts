import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskBoardComponent } from './pages/task-board/task-board';
import { TaskListComponent } from './pages/task-list/task-list';

const routes: Routes = [
  { path: 'project/:projectId/board', component: TaskBoardComponent },
  { path: 'project/:projectId/list', component: TaskListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }