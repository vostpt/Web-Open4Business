import { Component, OnInit, OnChanges, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';

import { FormsService } from '../../services/forms.service';
import { LoaderService } from '../../../loader';

import { ParameterModel, Parameter } from './models/parameter.model';
import { ValueModel } from './models/value.model';
import { FormEngineEventsEnum } from './enums/form-engine-events.enum';

/**
 * @param paramaters is an array of ParameterModel. For more info, check ParameterModel.
 * @param values is an object of objects to set the values of the parameters. This object follows the structure { parameterKey: { dataType, value } }.
 *
 * parameters will be drawn according with their rank and if none is provided, it will be displayed last, by the order they are in the array
 *
 * getForm() returns the value of the form and its state (valid or not). This is triggered by the components that use form engine so that they
 * can have access to the values of the form.
 */
@Component({
  selector: 'app-catalog-form-engine',
  templateUrl: './form-engine.component.html',
  styleUrls: ['./form-engine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormEngineComponent implements OnInit, OnChanges, OnDestroy {
  @Input() parameters: Parameter[];
  @Input() values; // object of objects -> parameterKey: {dataType, value}

  @Output() formEngineEvents: EventEmitter<{ type: string, data: any }> = new EventEmitter();

  public datasets: {};
  public errors: string[];
  public form: FormGroup;

  public contentReady = false;

  get f() { return this.form.controls; }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder,
    private readonly formsService: FormsService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    // when inputs parameters or values are changed, the form needs to be updated
    if (changes.paramaters || changes.values) {
      this.initForm();
    }
  }

  initForm() {
    this.form = this.fb.group({});
    if (!this.values) {
      this.values = {};
    }
    this.draw();
  }

  draw() {
    this.datasets = {};
    this.parameters = this.parameters.map(p => {
      const formParameter = this.getFormParameter(p);
      let control;

      if (formParameter.parameter.dataType === 'fields-group') {
        control = this.fb.array(
          ((this.values[formParameter.parameter.key] || {}).value || []).map(f => {
            const groupAux = {};
            // iterate over each row (value) to create as many rows in the form as requested
            Object.keys(f.value).forEach(key => {
              // iterate over fields array to set values of each parameter (even if null)
              formParameter.parameter.fields.forEach(field => {
                const validators = this.setValidators(field);
                groupAux[field.key] = new FormControl(f.value[field.key], validators);

                if (field.dataType === 'static-list') {
                  this.datasets[field.key] = (field.values || []).map(v => ({ id: v.id || v, value: v.value || v }));
                }
                if (formParameter.parameter.dataType === 'dynamic-list') {
                  this.datasets[field.key] = [];
                  this.loaderService.show(`parameter-${field.key}`);
                  this.formEngineEvents.emit({ type: FormEngineEventsEnum.REQUEST_DATA, data: field.key });
                }
              });
            });

            const group = this.fb.group(groupAux);
            return group;
          })
        );
      } else {
        control = new FormControl(formParameter.value, formParameter.validators);
      }

      this.form.addControl(formParameter.parameter.key, control);

      if (formParameter.parameter.dataType === 'static-list') {
        this.datasets[formParameter.parameter.key] = (formParameter.parameter.values || []).map(v => ({ id: v.id || v, value: v.value || v }));
      }
      if (formParameter.parameter.dataType === 'dynamic-list') {
        this.datasets[formParameter.parameter.key] = [];
        this.loaderService.show(`parameter-${formParameter.parameter.key}`);
        this.formEngineEvents.emit({ type: FormEngineEventsEnum.REQUEST_DATA, data: formParameter.parameter.key });
      }

      return formParameter.parameter;
    }).sort(this.compare);

    this.contentReady = true;
    this.cdr.detectChanges();
  }

  compare(a, b) {
    if (a.rank < b.rank || b.rank === undefined) {
      return -1;
    }
    if (a.rank > b.rank || a.rank === undefined) {
      return 1;
    }
    return 0;
  }

  getControlField(parameter, parent?, line?) {
    if (parent) {
      if (this.form.get(parent)['controls'][line]) {
        return this.form.get(parent)['controls'][line].get(parameter.key);
      }
      return null;
    } else {
      return this.form.get(parameter.key);
    }
  }

  getForm() {
    const form = {
      valid: this.form.valid,
      data: {}
    };

    if (!this.form.valid) {
      this.formsService.showErrors(this.form);
      this.cdr.detectChanges();
      return form;
    }

    Object.keys(this.form.value).forEach(key => {
      const parameter = this.parameters.find(p => p.key === key);
      form.data[key] = new ValueModel({ dataType: parameter.dataType, value: this.form.value[key] });
    });
    return form;
  }

  getFormParameter(p) {
    const parameter = new ParameterModel(p).get();
    const validators = this.setValidators(parameter);
    let value = this.values[parameter.key] ? this.values[parameter.key].value : null;

    if (parameter.dataType === 'boolean') {
      value = value === true || value === 'true';
    }

    return { parameter, validators, value };
  }

  isParameterVisible(parameter) {
    if (parameter.isVisible === false) {
      this.form.get(parameter.key).clearValidators();
      return false;
    }
    if (parameter.visibilityConditions) {
      // find the parameter that will trigger the visibility of the parameter provided
      const visibilityParameter = this.parameters.find(p => p.key === parameter.visibilityConditions.parameterKey
        || (p.dataType === 'fields-group' && p.fields.find(pAux => pAux.key === parameter.visibilityConditions.parameterKey) !== undefined));

      // check if the parameter found has the value needed to the parameter provided be displayed
      if (parameter.visibilityConditions.values.find(v => v === this.form.get(visibilityParameter.key).value)) {
        // re-set validators
        const validators = this.setValidators(parameter);
        this.form.get(parameter.key).setValidators(validators);
        this.form.get(parameter.key).updateValueAndValidity();
        return true;
      }
      this.form.get(parameter.key).clearValidators();
      this.form.get(parameter.key).updateValueAndValidity();
      return false;
    }
    return true;
  }

  onFieldGroupRowAdded(parameterKey) {
    const parameter = this.parameters.find(p => p.key === parameterKey);
    const groupAux = {};

    parameter.fields.forEach(field => {
      const validators = this.setValidators(field);
      groupAux[field.key] = new FormControl(null, validators);
    });

    const group = this.fb.group(groupAux);
    (this.form.get(parameterKey) as FormArray).push(group);
    this.cdr.detectChanges();
  }

  onFieldGroupRowRemoved(parameterKey, index) {
    (this.form.get(parameterKey) as FormArray).removeAt(index);
    this.cdr.detectChanges();
  }

  onFileEventReceived(event, parameterKey) {
    switch (event.type) {
      case 'fileUploaded':
        this.form.get(parameterKey).setValue({
          fileKey: event.data.fileKey,
          fileName: event.data.name,
          fileSize: event.data.size
        });
        break;
      case 'fileUploaded':
        if (event.data.status === 'success') {
          this.form.get(parameterKey).setValue(undefined);
        }
        break;
      default:
        break;
    }
  }

  setValidators(parameter) {
    const validators = [];
    if (parameter.validations) {
      if (parameter.validations.isRequired) {
        validators.push(Validators.required);
      }
      if (parameter.validations.regexPattern) {
        validators.push(Validators.pattern(parameter.validations.regexPattern));
      }
    }

    return validators;
  }

  updateDataset(key, value) {
    if (this.datasets[key]) {
      this.datasets[key] = value;
      this.loaderService.hide(`parameter-${key}`);
    }
  }

  ngOnDestroy() { }
}
