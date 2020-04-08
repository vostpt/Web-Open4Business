import { Component, Input, OnInit, AfterViewInit, DoCheck, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { v4 as uuid } from 'uuid';
import { upperFirst } from 'lodash';

@Component({
  selector: 'app-catalog-form-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchInputComponent),
    multi: true
  }]
})
export class SearchInputComponent implements ControlValueAccessor, OnInit, AfterViewInit, DoCheck, OnDestroy {
  @Input() formControlField: FormControl;
  @Input() id?: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() autofocus: boolean;
  @Input() tooltip: string;
  @Input() size: string;

  public value: string;

  private debouncer = null;

  public deleteIconVisible = false;

  private onChange: any = () => { };
  private onTouch: any = () => { };

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.id           = (this.id || uuid()) + '-in';
    this.tooltip      = this.tooltip || '';
    this.placeholder  = this.placeholder || '';
    this.label        = upperFirst(this.label) || '';
  }

  ngAfterViewInit() {
  }

  ngDoCheck() {
  }

  // Below methods are automatically called for each component implementing ControlValueAccessor interface.
  // // Writes new values from the form model into the view.
  writeValue(value: string) {
    this.deleteIconVisible = value ? true : false;
    this.value = value;
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
    this.deleteIconVisible = !(e.target.value === '');
    this.value = e.target.value;

    if (this.debouncer) {
      clearTimeout(this.debouncer);
    }

    this.debouncer = setTimeout(() => {
      this.onChange(e.target.value);
    }, 250);
  }

  onSearchButtonClicked() {
    this.onChanged({ target: { value: this.value } });
  }

  onClearButtonClicked() {
    this.onChanged({ target: { value: '' } });
    this.writeValue('');
  }

  ngOnDestroy() {
  }
}
