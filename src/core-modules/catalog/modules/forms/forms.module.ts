import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LoaderModule } from '../loader';

import { ColorSwatchesModule } from 'ngx-color/swatches';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { FormEngineComponent } from './components/form-engine/form-engine.component';
import { InputComponent } from './components/input/input.component';
import { RadioComponent } from './components/radio/radio.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SelectComponent, OptionsTemplateDirective, LabelTemplateDirective } from './components/select/select.component';
import { TextAreaComponent } from './components/textarea/textarea.component';

import { FormsService } from './services/forms.service';

import { AutofocusDirective } from './directives/autofocus-directive';

@NgModule({
  declarations: [
    AutofocusDirective,
    CheckboxComponent,
    ColorPickerComponent,
    FormEngineComponent,
    InputComponent,
    RadioComponent,
    SearchInputComponent,
    SelectComponent,
    TextAreaComponent,

    LabelTemplateDirective,
    OptionsTemplateDirective
  ],
  imports: [
    CommonModule,
    AngularFormsModule,
    ColorSwatchesModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
    LoaderModule,
    NgbDropdownModule
  ],
  exports: [
    AngularFormsModule,
    ReactiveFormsModule,
    AutofocusDirective,
    CheckboxComponent,
    ColorPickerComponent,
    FormEngineComponent,
    InputComponent,
    RadioComponent,
    SearchInputComponent,
    SelectComponent,
    TextAreaComponent,

    LabelTemplateDirective,
    OptionsTemplateDirective
  ],
  providers: [
    FormsService
  ]
})

export class FormsModule {}
