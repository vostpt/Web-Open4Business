import { Component, Input, Output, OnInit, AfterViewInit, OnDestroy, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { upperFirst } from 'lodash';

@Component({
  selector: 'app-catalog-form-radio',
  templateUrl: './radio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true
  }]
})
export class RadioComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

  @Input() formControlField: FormControl;
  @Input() name: string;
  @Input() value: string;
  @Input() label: string;
  @Output() changeValueEvent = new EventEmitter();

  public checked: string;

  private onChange: any = () => { };
  private onTouch: any = () => { };

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.label = upperFirst(this.label) || '';
  }

  ngAfterViewInit() { }

  // Below methods are automatically called for each component implementing ControlValueAccessor interface.
  // // Writes new values from the form model into the view.
  writeValue(value: any) {
    this.checked = this.value === value ? 'checked' : null;
    this.cdr.detectChanges();
  }
  // // Used to register a handler that should be fired when something in the view change.
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // // Similar to registerOnChange(), but this registers a handler specifically for when a control receives a touch event.
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  onTouched() {
    this.onTouch(null);
  }

  onChanged(e: any) {
    this.onChange(this.value);
  }

  ngOnDestroy() { }
}
