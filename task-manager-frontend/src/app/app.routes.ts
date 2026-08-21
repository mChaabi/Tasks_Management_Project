// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-routing-module').then(m => m.AuthRoutingModule)
  },
  {
    path: 'projects',
    canActivate: [authGuard],
    loadChildren: () => import('./features/projects/projects-routing-module').then(m => m.ProjectsRoutingModule)
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadChildren: () => import('./features/tasks/tasks-routing-module').then(m => m.TasksRoutingModule)
  },
  {
    path: 'calendar',
    canActivate: [authGuard],
    loadComponent: () => import('./features/calendar/calendar').then(m => m.CalendarComponent)
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'projects'
  }
];