import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'basic',
    loadComponent: () => import('./features/basic/basic.component').then(m => m.BasicComponent)
  },
  {
    path: '',
    redirectTo: 'basic',
    pathMatch: 'full'
  }
];
