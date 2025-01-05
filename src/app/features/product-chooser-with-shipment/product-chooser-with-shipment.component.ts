import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';

import {ProductCardComponent} from '../../shared/product-card.component';
import {ProductService} from '../../core/product.service';

@Component({
  selector: 'product-chooser-with-shipment',
  template: `
    <h1>Procut with shipment</h1>
    <product-card
      [product]="selectedProduct()"
      (next)="nextProduct()"
      (prev)="previousProduct()"
    />
  `,
  imports: [ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductChooserWithShipmentComponent {
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
