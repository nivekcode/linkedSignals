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
    path: '',
    redirectTo: 'product-chooser-with-shipment',
    pathMatch: 'full'
  }
];
