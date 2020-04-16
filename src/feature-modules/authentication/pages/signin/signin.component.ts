import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BasePageComponent } from '@core-modules/main-layout';
import { FormsService } from '@core-modules/catalog/modules/forms';

import { AuthenticationService } from '@authentication-feature-module/services/authentication.service';

@Component({
  selector: 'app-authentication-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends BasePageComponent implements OnInit, AfterViewInit, OnDestroy {

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
      authId: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

  }

  ngAfterViewInit() {
    this.loader.hide('pageLoader');
  }

  onFormSubmit() {
    this.loader.show('pageLoader');
    this.logger.info(this.form.value);
    if (this.form.valid) {

      const bodyPayload = {
        authId: this.form.get('authId').value,
        password: this.form.get('password').value,
        sessionType: 'auth'
      };
      this.subscriptions.push(
        this.authenticationService.signin(bodyPayload)
          .subscribe(
            (result: { data: { token: string } }) => {
              localStorage.setItem('token', result.data.token);

              this.loader.hide('pageLoader');
              this.notification.success('O login foi efetuado com sucesso.');
              this.router.navigateByUrl('businesses/locations/new');
            },
            () => {
              this.loader.hide('pageLoader');
              this.notification.error('As credenciais fornecidas são inválidas. Verifique os dados inseridos e tente novamente.');
            }));
    }
    else {
      this.loader.hide('pageLoader');
      this.formsService.showErrors(this.form);
    }
  }

}
