import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'basic',
    loadComponent: () => import('./features/basic/basic.component').then(m => m.BasicComponent)
  },
  {
    path: 'product-chooser',
    loadComponent: () => import('./features/product-chooser/product-chooser.component').then(m => m.ProductChooserComponent)
  },
  {
    path: '',
    redirectTo: 'product-chooser',
    pathMatch: 'full'
  }
];
