import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // Module Authentification (Public)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-routing-module').then(m => m.AuthRoutingModule)
  },

  // Module Projects (Protégé)
  {
    path: 'projects',
    canActivate: [authGuard],
    loadChildren: () => import('./features/projects/projects-routing-module').then(m => m.ProjectsRoutingModule)
  },

  // Module Tasks (Protégé)
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadChildren: () => import('./features/tasks/tasks-routing-module').then(m => m.TasksRoutingModule)
  },

  // Redirection par défaut
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },

  // Page 404 (Wildcard)
  {
    path: '**',
    redirectTo: 'projects'
  }
];