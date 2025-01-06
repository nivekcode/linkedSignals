import {AbstractControl} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {effect, linkedSignal} from '@angular/core';

// DONT DO THIS
export function signalFormControl(control: AbstractControl) {
  const controlSignal = linkedSignal(
    toSignal(control.valueChanges, {
      initialValue: control.value
    })
  )

  effect(() => {
    control.setValue(controlSignal());
  })

  return controlSignal;

}
