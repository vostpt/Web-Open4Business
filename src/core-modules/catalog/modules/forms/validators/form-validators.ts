import { AbstractControl, FormGroup } from '@angular/forms';

export function passwordFormatValidator(formField: AbstractControl): { [key: string]: any } | null {

  const regex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
  return regex.test(formField.value) ? { passwordFormat: true } : null;

}

export function passwordFieldsMatchValidator(formGroup: FormGroup): { [key: string]: any } | null {
  return formGroup.controls['password'].value === formGroup.controls['confirmPassword'].value ? null : { passwordFieldsMatch: true };
}

export function jsonFormatValidator(formField: AbstractControl): { [key: string]: any } | null {

  try {
    JSON.parse(formField.value);
  } catch (err) {
    return { jsonFormat: true };
  }
  return null;

}
