import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';
import {signalFormControl} from '../../shared/signalformcontrol.util';

@Component({
  selector: 'form-example',
  template: `
    <form [formGroup]="addressForm">
      <fieldset>
        <label for="firstname">Firstname</label>
        <input formControlName="firstname" id="firstname" type="text" placeholder="Firstname"/>
      </fieldset>
      <fieldset>
        <label for="name">Name</label>
        <input formControlName="name" id="name" type="text" placeholder="Name"/>
      </fieldset>
    </form>

    <div class="value-container">
      <div class="value-pair">
        <label>Firstname value:</label>
        {{ firstname() | json }}
      </div>

      <div class="value-pair">
        <label>name value:</label>
        {{ name() | json }}
      </div>
    </div>

    <button (click)="updateFirstname()">Set firstname to Tim</button>
    <button (click)="updateName()">Set firstname to Tim</button>

  `,
  imports: [JsonPipe, ReactiveFormsModule],
  styles: `

    .value-container {
      border-top: 1px solid grey;
      margin-top: 16px;

      display: flex;
      flex-direction: column;
      gap: 12px;
    }


    fieldset {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border: none;
    }

    input {
      height: 32px;
      width: 250px;

      &:focus {
        outline: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormExampleComponent {

  addressForm = inject(FormBuilder).group({
    firstname: '',
    name: ''
  });

  firstname = signalFormControl(this.addressForm.controls.firstname);
  name = signalFormControl(this.addressForm.controls.name);

  addressFormChanges = toSignal(this.addressForm.valueChanges);

  updateFirstname(){
    this.firstname.set('Tim');
  }

  updateName(){
    this.name.set('Taylor');
  }
}
