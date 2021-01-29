import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class GenericValidator {

  constructor() {

  }

  static set(validators: ValidatorFn[],
    asyncValidators: AsyncValidatorFn[] | null = null,
    updateOn?: 'change' | 'blur' | 'submit'): AbstractControlOptions {
    return { validators, asyncValidators, updateOn } as AbstractControlOptions;
  }

  static mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  static mustHaveAlphaNumericChar(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null  => {

      if (control && control.value) {
        const regex = /([A-Za-z])/;

        if (!regex.exec(control.value)) {
          return { mustHaveAlphaNumericChar: true };
        } else {
          return null;
        }
      } else {
        return null;
      }
    };
  }

  static mustHaveDigit(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control && control.value) {
        const regex = /([0-9])/;

        if (!regex.exec(control.value)) {
          return { mustHaveDigit: true };
        } else {
          return null;
        }
      } else {
        return null;
      }
    };
  }

  static mustHaveLowerCase(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control && control.value) {
        const regex = /([a-z])/;

        if (!regex.exec(control.value)) {
          return { mustHaveLowerCase: true };
        } else {
          return null;
        }
      } else {
        return null;
      }
    };
  }

  static mustHaveUpperCase(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control && control.value) {
        const regex = /([A-Z])/;

        if (!regex.exec(control.value)) {
          return { mustHaveUpperCase: true };
        } else {
          return null;
        }
      } else {
        return null;
      }
    };
  }

  static mustHaveSymbol(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control && control.value) {
        const regex = /([-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])/;

        if (!regex.exec(control.value)) {
          return { mustHaveSymbol: true };
        } else {
          return null;
        }
      } else {
        return null;
      }
    };
  }
}
