import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BasePageComponent } from '@core-modules/main-layout';
import { FormsService } from '@core-modules/catalog/modules/forms';

import { AuthenticationService } from '@authentication-feature-module/services/authentication.service';

@Component({
  selector: 'app-authentication-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BasePageComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup;
  get f() { return this.form.controls; }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly formsService: FormsService
  ) {
    super();
  }


  ngOnInit() {

    this.loader.show('pageLoader');

    this.form = this.formBuilder.group({
      company: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      name: [null, Validators.required],
      phone: [null, Validators.required]
    });

  }

  ngAfterViewInit() {
    this.loader.hide('pageLoader');
  }

  onFormSubmit() {

    if (this.form.valid) {
      this.loader.show('pageLoader');

      const bodyPayload = this.form.value;
      this.subscriptions.push(
        this.authenticationService.signup(bodyPayload)
          .subscribe(
            () => {
              this.loader.hide('pageLoader');
              this.notification.success('O registo foi criado e irá para aprovação. Será notificado brevemente...');
              this.router.navigateByUrl('auth/signup/success');
            },
            error => {
              this.loader.hide('pageLoader');
              this.notification.error('Ocorreu um erro ao registar. Tente mais tarde ou contacte os nossos serviços de apoio.');
              this.logger.error('Signup unsuccessful', error);
            }));
    }
    else {
      this.loader.hide('pageLoader');
      this.formsService.showErrors(this.form);
    }
  }

}
