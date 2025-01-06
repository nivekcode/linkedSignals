import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';

import {ProductService} from '../../core/product.service';
import {ProductCardSingleStateComponent} from './product-card-single-state.component';

@Component({
  selector: 'product-chooser-single-state',
  template: `
    <product-card-single-state
      [product]="selectedProduct()"
      (next)="nextProduct()"
      (prev)="previousProduct()"
    />
  `,
  imports: [ProductCardSingleStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductChooserSingleStateComponent {
  #productService = inject(ProductService);
  #PRODUCTS = this.#productService.PRODUCTS_WITH_SHIPMENT;

  index = signal(0);
  selectedProduct = computed(() => this.#PRODUCTS[this.index()]);

  nextProduct() {
    this.index.update(v => {
      if (v < this.#PRODUCTS.length - 1) {
        return v + 1;
      }
      return 0;
    });
  }

  previousProduct() {
    this.index.update(v => {
      if (v > 0) {
        return v - 1;
      }
      return this.#PRODUCTS.length - 1;
    });
  }
}
