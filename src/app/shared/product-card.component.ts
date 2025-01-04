import {ChangeDetectionStrategy, Component, computed, input, linkedSignal, output, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {Product} from '../core/product.service';

@Component({
  selector: 'product-card',
  template: `
    <div class="card">
      <img
        [src]="product().imageUrl"/>
      <div class="header">
        <h2>{{ product().title }}</h2>
        <div class="btn-bar">
          <button
            [disabled]="amount() === 1"
            (click)="remove()" class="btn is-remove">-</button>
          <button (click)="add()" class="btn is-add">+</button>
        </div>
      </div>
      <p>
        {{ product().description }}
      </p>
      <div class="amount">
        <small>Amount:</small> {{ amount() }}
      </div>
      <div class="price">
        <small>Price per item:</small> {{ product().price | currency:'CHF ' }}
      </div>
      <div class="price">
        <small>Total:</small> {{ total() | currency:'CHF ' }}
      </div>

      <div class="btn-bar margin-t-md stretch">
        <button (click)="prev.emit()" class="product-chooser-btn">Previous product</button>
        <button (click)="next.emit()" class="product-chooser-btn">Next product</button>
      </div>

    </div>
  `,
  styles: `
    .product-chooser-btn {
      border-radius: 12px;
      padding: 8px;
      border: none;
      flex: 1;
      background: blue;
      height: 40px;
      font-size: 18px;
      color: white;
      cursor: pointer;
    }


    img {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      border-radius: 12px;
    }

    .btn-bar {
      display: flex;
      align-items: center;
      gap: 20px;

      &.stretch {
        justify-content: stretch;
      }
    }

    .amount,
    .price {
      display: flex;
      align-items: center;
      justify-content: end;
      font-size: 28px;
      font-weight: bold;

      small {
        margin-right: 20px;
      }

    }

    .btn {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background: red;
      color: white;
      font-size: 32px;
      font-family: "Roboto", sans-serif;
      border: none;
      cursor: pointer;

      &.is-remove {
        background: red;
      }

      &.is-add {
        background: blue;
      }

      &.is-remove[disabled] {
        background: #9d9d9d;
        color: #595757;
      }
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,
  imports: [
    CurrencyPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  product = input.required<Product>();

  amount = linkedSignal({
    source: this.product,
    computation: () => 1
  });

  total = computed(() => {
    return this.product().price * this.amount();
  });

  next = output();
  prev = output();

  add() {
    this.amount.update(v => v + 1);
  }

  remove() {
    this.amount.update(v => v - 1);
  }
}
