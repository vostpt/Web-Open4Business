import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BasePageComponent } from '@core-modules/main-layout';
import { FormsService, passwordFormatValidator, passwordFieldsMatchValidator } from '@core-modules/catalog/modules/forms';

import { UsersService } from '@users-feature-module/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-user-update-info',
  templateUrl: './user-update-info.component.html',
  styleUrls: ['./user-update-info.component.scss']
})
export class UserUpdateInfoComponent extends BasePageComponent implements OnInit, AfterViewInit, OnDestroy {

  contentReady = false;
  formUserInfoOnEditMode = false;
  formPasswordOnEditMode = false;

  public isAdmin: boolean;
  public authId: string;
  public title: string;

  formUserInfo: FormGroup;
  formUserPassword: FormGroup;
  get fUserInfo() { return this.formUserInfo.controls; }
  get fUserPassword() { return this.formUserPassword.controls; }

  datasets = {
    user: {}
  };


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly formsService: FormsService,
    private route: ActivatedRoute) {
    super();
  }


  ngOnInit() {

    this.loader.show('pageLoader');

    this.isAdmin = localStorage.getItem('isA') === 'true';

    this.formUserInfo = this.formBuilder.group({
      company: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required]
    });


    // Read query params
    this.route.queryParams.subscribe(params => {
      this.authId = params['email'];
      
      if (this.isAdmin && this.authId && this.authId != localStorage.getItem('email')) {
        this.title = this.authId;
      } else {
        this.title = 'A minha conta';
        this.authId = null;
      }

      this.formUserPassword = this.formBuilder.group({
        currentPassword: [null, this.authId ? null : Validators.required],
        password: [null, [Validators.required, passwordFormatValidator]],
        confirmPassword: [null, [Validators.required, passwordFormatValidator]]
      },
        { validator: passwordFieldsMatchValidator });

      this.subscriptions.push(this.usersService.getUser(this.authId).subscribe(
        (result: { data: { company: object, info: object } }) => {
  
          this.datasets.user = result.data.info;
          this.datasets.user['company'] = result.data.company['company'];
  
          this.fUserInfo.company.setValue(this.datasets.user['company']);
          this.fUserInfo.name.setValue(this.datasets.user['name']);
          this.fUserInfo.email.setValue(this.datasets.user['email']);
          this.fUserInfo.phone.setValue(this.datasets.user['phone']);
  
          this.contentReady = true;
          this.loader.hide('pageLoader');
        },
        (error) => {
          this.contentReady = true;
          this.loader.hide('pageLoader');
          this.logger.error('Error fetching user info', error);
        }));
    });
  }

  ngAfterViewInit() {
    this.loader.hide('pageLoader');
  }



  showEditableForm(form) {
    switch (form) {
      case 'formUserInfo':
        this.formUserInfoOnEditMode = true;
        break;
      case 'formPassword':
        this.formPasswordOnEditMode = true;
        break;
      default:
        break;
    }

  }

  onUserInfoSubmit() {
    if (this.formUserInfo.valid) {
      this.loader.show('pageLoader');

      const bodyPayload = this.formUserInfo.value;

      if (this.authId) {
        bodyPayload.authId = this.authId;
      }

      this.subscriptions.push(
        this.usersService.saveUserInfo(bodyPayload).subscribe(
          () => {
            this.formUserInfoOnEditMode = false;
            this.loader.hide('pageLoader');
            this.notification.success('A informação foi enviada com sucesso');
          },
          error => {

            this.loader.hide('pageLoader');

            if (error.status === 401) { // Mail already exists
              this.notification.error('A informação enviada entrou em conflito com dados existentes. Por favor, experimente com outros dados.');
            }
            else {
              this.notification.error('Ocorreu um erro ao atualizar. Tente mais tarde ou contacte os nossos serviços de apoio.');
              this.logger.error('User info update unsuccessful', error);
            }
          }
        )
      );
    }
    else {
      this.loader.hide('pageLoader');
      this.formsService.showErrors(this.formUserInfo);
    }
  }


  onUserPasswordSubmit() {
    if (this.fUserPassword.password.valid && this.formUserPassword.errors?.passwordFieldsMatch) {
      this.fUserPassword.password.setErrors({ passwordFieldsMatch: true });
      return;
    }

    if (this.formUserPassword.valid) {
      this.loader.show('pageLoader');

      let bodyPayload;

      if (this.authId) {
        bodyPayload = {
          authId: this.authId,
          password: this.formUserPassword.get('password').value
        };
      } else {
        bodyPayload = {
          currentPassword: this.formUserPassword.get('currentPassword').value,
          password: this.formUserPassword.get('password').value
        };
      }

      this.subscriptions.push(
        this.usersService.saveUserPassword(bodyPayload).subscribe(
          () => {
            this.formPasswordOnEditMode = false;
            this.loader.hide('pageLoader');
            this.notification.success('A password foi alterada com sucesso');
            this.formUserPassword.reset();
          },
          error => {

            this.loader.hide('pageLoader');

            if (error.status === 401) { // Current password does not match
              this.notification.error('Não foi possível atualizar a sua password. Verifique se a password atual está correcta.');
            }
            else {
              this.notification.error('Ocorreu um erro ao atualizar. Tente mais tarde ou contacte os nossos serviços de apoio.');
              this.logger.error('Passwordupdate unsuccessful', error);
            }

          }
        )
      );
    }
    else {
      console.log('Invalid form', this.formUserPassword.errors);
      this.loader.hide('pageLoader');
      this.formsService.showErrors(this.formUserPassword);
    }
  }
}
