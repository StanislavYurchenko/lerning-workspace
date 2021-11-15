import { Injectable } from '@angular/core';

import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

interface Control {
  [key: string]: boolean,
}

@Injectable()
export class ValidationService {
  passwordConfirmValidator(group: AbstractControl): ValidatorFn {
    return (control: AbstractControl): Control | null => {
      const password = group.get('password')?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : { passwordsAreNotSame: true };
    }
  }

  conditionallyRequiredValidator(condition: boolean): ValidatorFn {
    return (formControl: AbstractControl): Control | null => {
      if (condition) {
        return Validators.required(formControl);
      }
      return null;
    };
  }
}
