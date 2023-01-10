import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function createEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const isEmailValid = /^[0-9a-zA-Z_.-]{3,15}@[a-zA-Z]{2,6}.[a-zA-Z]{2,6}$/.test(value);

    return !isEmailValid ? { emailInvalid: true } : null;
  };
}