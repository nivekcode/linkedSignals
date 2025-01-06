import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';

import {ProductCardComponent} from '../../shared/product-card.component';
import {ProductService} from '../../core/product.service';
import {ProductCardOldComponent} from './product-card-old.component';

@Component({
  selector: 'product-chooser-old',
  template: `
    <product-card-old
      [product]="selectedProduct()"
      (next)="nextProduct()"
      (prev)="previousProduct()"
    />
  `,
  imports: [ProductCardOldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductChooserOldComponent {
  #productService = inject(ProductService);
  #PRODUCTS = this.#productService.PRODUCTS;

  index = signal(0);
  selectedProduct = computed(() => this.#PRODUCTS[this.index()]);

  nextProduct() {
    this.index.update(v => {
      if (v < this.#productService.PRODUCTS.length - 1) {
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
      return this.#productService.PRODUCTS.length - 1;
    });
  }
}
