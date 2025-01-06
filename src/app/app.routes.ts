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
    path: 'product-chooser-old',
    loadComponent: () => import('./features/product-chooser-old/product-chooser-old.component').then(m => m.ProductChooserOldComponent)
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
    path: 'product-chooser-single-state',
    loadComponent: () => import('./features/product-chooser-single-state/product-chooser-single-state.component').then(m => m.ProductChooserSingleStateComponent)
  },
  {
    path: '',
    redirectTo: 'product-chooser-single-state',
    pathMatch: 'full'
  }
];
