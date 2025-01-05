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
    path: 'product-chooser-with-shipment',
    loadComponent: () => import('./features/product-chooser-with-shipment/product-chooser-with-shipment.component').then(m => m.ProductChooserWithShipmentComponent)
  },
  {
    path: 'todo-list',
    loadComponent: () => import('./features/todo-list/todo-list.component').then(m => m.TodoListComponent)
  },
  {
    path: '',
    redirectTo: 'todo-list',
    pathMatch: 'full'
  }
];
