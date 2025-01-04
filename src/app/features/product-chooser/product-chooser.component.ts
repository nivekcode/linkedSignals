import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';

import {ProductCardComponent} from '../../shared/product-card.component';
import {ProductService} from '../../core/product.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'product-chooser',
  template: `
    <product-card
      [product]="selectedProduct()"
      (next)="nextProduct()"
      (prev)="previousProduct()"
    />
  `,
  imports: [ProductCardComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductChooserComponent {
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
