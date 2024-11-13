import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export const ListNameValidators = {
	maxLengthValidator
}

  function maxLengthValidator(length: number): ValidatorFn {
	return (control: AbstractControl) => {
	  if (!Validators.maxLength(length)(control) || length < 1) {
		return null;
	  }
	  return { maxlength: { requiredLength: length } };
	};
  }