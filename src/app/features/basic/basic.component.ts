import {ChangeDetectionStrategy, Component, computed, linkedSignal, signal} from '@angular/core';
import {JsonPipe} from '@angular/common';

@Component({
  standalone: true,
  selector: 'basic',
  template: `
    <h1>{{ availableFruits() | json }}</h1>
    <button (click)="updateFruits()">Update fruits</button>
    <button (click)="setFreshAvailableFruits()">Set new available fruits</button>
  `,
  imports: [
    JsonPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicComponent {
  fruits = signal(['apple', 'banana', 'cherry']);
  availableFruits = linkedSignal(
    () => this.fruits()
  );

  setFreshAvailableFruits(){
    this.availableFruits.set(['orange', 'pear', 'strawberry']);
  }

  updateFruits(){
    this.fruits.update(v => [...v, 'kiwi']);
  }
}
