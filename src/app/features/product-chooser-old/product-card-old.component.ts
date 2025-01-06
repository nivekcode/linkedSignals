import {ChangeDetectionStrategy, Component, computed, effect, input, linkedSignal, output, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';

import {Product} from '../../core/product.service';

@Component({
  selector: 'product-card-old',
  template: `
    <div class="card">
      <img
        [src]="product().imageUrl"/>
      <div class="header">
        <h2>{{ product().title }}</h2>
        <div class="btn-bar">
          <button
            [disabled]="amount() === 1"
            (click)="remove()" class="btn is-remove">-
          </button>
          <button (click)="add()" class="btn is-add">+</button>
        </div>
      </div>
      <div>
        <div class="description">
          {{ product().description }}
        </div>
        <div class="pricing-row">
          <div class="amount">
            <small>Amount:</small>
            {{ amount() }}
          </div>
          <div class="price">
            <small>Price per item:</small> {{ product().price | currency }}
          </div>
          <div class="price is-total">
            <small>Total:</small> <span>{{ total() | currency }}</span>
          </div>
        </div>

        <div class="btn-bar space-between margin-t-md">

          <!--
          <select>
            @for (shippingOption of product().shippingOptions; track shippingOption) {
              <option [attr.selected]="desiredShippingOption() === shippingOption ? 'selected' : null">{{ shippingOption }}</option>
            }
          </select>
          -->

          <div class="btn-bar">
            <button (click)="prev.emit()" class="btn"><</button>
            <button (click)="next.emit()" class="btn">></button>
            <button class="btn is-yellow">
          <span class="material-symbols-outlined">
add_shopping_cart
</span>
            </button>
          </div>
        </div>

      </div>
  `,
  styles: `

    .pricing-row {
      margin-top: 12px;
      padding-top: 12px;
      padding-bottom: 12px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #f7f3f3;
      border-bottom: 1px solid #f7f3f3;
    }

    img {
      width: 100%;
      max-height: 248px;
      object-fit: cover;
      border-radius: 12px;
    }

    .btn-bar {
      display: flex;
      align-items: center;
      gap: 8px;

      &.space-between {
        justify-content: space-between;
      }

      &.stretch {
        justify-content: stretch;
      }

      &.end {
        justify-content: flex-end;
      }
    }

    .amount,
    .price {
      display: flex;
      flex-direction: column;
      align-items: end;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;

      small {
        font-size: 12px;
        font-family: "Roboto", sans-serif;
        font-weight: 300;
        color: #746969;
      }

    }

    .btn {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Baloo 2", sans-serif;
      cursor: pointer;
      background: #f2ebeb;
      box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.1),
      inset 0 2px 4px rgba(255, 255, 255, 0.25),
      inset 0 -2px 4px rgba(255, 255, 255, 0.1);
      border: 1px solid white;

      &.is-yellow {
        background: #e6e61c;
      }

      &.is-remove[disabled] {
        background: #dcc6c6;
        color: #6f6969;
      }
    }

    .description {
      padding-bottom: 12px;
      font-size: 16px;
      font-weight: 300;
      font-family: "Roboto", sans-serif;
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
export class ProductCardOldComponent {
  product = input.required<Product>();
  amount = signal(1);

  total = computed(() => {
    return this.product().price * this.amount();
  });

  #resetAmountEffect = effect(() => {
    this.product();
    this.amount.set(1);
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
