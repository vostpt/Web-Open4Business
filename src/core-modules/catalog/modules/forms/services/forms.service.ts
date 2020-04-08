import { Injectable } from '@angular/core';
import { FormGroup, FormArray, AbstractControl} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { isEmpty } from 'lodash';

@Injectable()
export class FormsService {

  constructor(
    private t: TranslateService
  ) {}

  getValidationMessage(error: object) {
    if (isEmpty(error)) {
      return null;
    }

    if ('custom' in error)              { return error['custom']; }
    if ('required' in error)            { return this.t.instant('dictionary.required'); }
    if ('email' in error)               { return this.t.instant('messages.errors.invalid_email'); }
    if ('wrongVersionNumber' in error)  { return this.t.instant('messages.errors.invalid_version_number'); }
    if ('wrongVersionPattern' in error) { return this.t.instant('messages.errors.invalid_version_pattern'); }
    if ('passwordFormat' in error)      { return this.t.instant('messages.errors.password_regex'); }
    if ('passwordFieldsMatch' in error) { return this.t.instant('messages.errors.password_mismatch'); }
    if ('pattern' in error)             { return this.t.instant('messages.errors.invalid_format'); }
    if ('jsonFormat' in error)          { return this.t.instant('messages.errors.json_format'); }
    if ('sameDisplayName' in error)     { return this.t.instant('messages.errors.unique_property_name'); }
    if ('minlength' in error)           { return this.t.instant('messages.errors.min_length') + ' (' + error['minlength']['requiredLength'] + ')'; }
    if ('min' in error)                 { return this.t.instant('messages.errors.invalid_value'); }
    if ('rangeError' in error)          { return this.t.instant('messages.errors.invalid_value'); }
  }


  showErrors(form: FormGroup | FormArray) {

    Object.keys(form.controls).forEach((key: string) => {
      const abstractControl = form.controls[key] as AbstractControl;

      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        this.showErrors(abstractControl);
      } else {
        abstractControl.markAsDirty();
        abstractControl.markAsTouched();
      }
    });

  }

}
