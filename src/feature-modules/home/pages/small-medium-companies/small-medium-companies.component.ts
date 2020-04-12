import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BasePageComponent } from '@core-modules/main-layout';

import { HomeService } from '@home-feature-module/services/home.service';
import { FormsService } from '@core-modules/catalog/modules/forms';

@Component({
  selector: 'app-home-small-medium--companies',
  templateUrl: './small-medium-companies.component.html',
  styleUrls: ['./small-medium-companies.component.scss']
})
export class SmallMediumCompaniesComponent extends BasePageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly homeService: HomeService,
    private readonly formsService: FormsService
    ) {
      super();
    }


  get f() { return this.form.controls; }

  ngOnInit() {

    this.loader.show('pageLoader');

    this.form = this.formBuilder.group({
      company: [null, Validators.required],
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required]
    });

    this.loader.hide('pageLoader');

    document.getElementById('kt_quick_panel_close_btn').click();
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.loader.show('pageLoader');

      const bodyPayload = this.form.value;
      this.subscriptions.push(
        this.homeService.sendLargeCompaniesForm(bodyPayload).subscribe(
          () => {
            this.notification.success('A informação foi enviada com sucesso');
          },
          err => {
            // if ((err.error.data || {}).errors) {
            //   this.formGeneralErrors.messages = err.error.data.errors;
            // } else {
            //   this.formGeneralErrors.messages.push(err.error.resultMessage);
            // }
            // this.formGeneralErrors.visible = true;
  
            this.loader.hide('pageLoader');
          }
        )
      );
    } else {
      // TODO: verificar estes erros!
      this.formsService.showErrors(this.form);
    }
  }

}
