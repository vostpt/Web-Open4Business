import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { upperFirst } from 'lodash';

import { BasePageComponent } from '@core-modules/main-layout';

import { UsersService } from '@users-feature-module/services/users.service';

@Component({
  selector: 'app-users-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends BasePageComponent implements OnInit, AfterViewInit, OnDestroy {
  contentReady = false;

  form: FormGroup;
  get f() { return this.form.controls; }

  datasets = { users: [] };

  public statusList = [
    { id: 'active', desc: upperFirst(this.translate('dictionary.active_s')) },
    { id: 'pending', desc: upperFirst(this.translate('dictionary.pending_s')) },
    { id: 'inactive', desc: upperFirst(this.translate('dictionary.inactives')) },
    { id: 'deleted', desc: upperFirst(this.translate('dictionary.deleted_s')) }
  ];
  private status: string = null;
  public total = 0;
  public pages = 1;
  public page = 1;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
  ) {
    super();
  }


  ngOnInit() {
    if (localStorage.getItem('isA') !== 'true') {
      location.href = '/not-found';
      return;
    }

    this.loader.show('pageLoader');

    this.form = this.formBuilder.group({
      search: [null],
      active: [null],
    });

    this.form.get('active').valueChanges.subscribe(val => {
      this.status = val;

      this.onSearch();
    });

    this.subscriptions.push(this.usersService.getUsers(50, (this.page - 1) * 50).subscribe(
      (result) => {
        this.datasets.users = result['data'].users;
        this.decodeUserStatus();

        this.total = parseInt(result['data'].total, 10);
        this.pages = Math.ceil(this.total / 50);
        const offset = parseInt(result['data'].offset, 10);
        this.page = offset > 0 ? Math.round(offset / 50) + 1 : 1;

        this.contentReady = true;
        this.loader.hide('pageLoader');
      },
      (error) => {
        this.contentReady = true;
        this.loader.hide('pageLoader');
        this.logger.error('Error fetching users list', error);
      }));
  }

  ngAfterViewInit() { }

  goto(page: number) {
    if (page < 1) {
      this.page = 1;
    } else if (page > this.pages) {
      this.page = this.pages;
    } else {
      this.page = page;
    }

    this.onSearch();
  }

  onSearch() {
    this.logger.info('form', this.form.value);

    this.loader.show('pageLoader');

    this.subscriptions.push(
      this.usersService.getUsers(50, (this.page - 1) * 50, this.form.value.search, this.status)
        .subscribe(
          (result) => {
            this.datasets.users = result['data'].users;
            this.decodeUserStatus();

            this.total = parseInt(result['data'].total, 10);
            this.pages = Math.ceil(this.total / 50);
            const offset = parseInt(result['data'].offset, 10);
            this.page = offset > 0 ? Math.round(offset / 50) + 1 : 1;

            this.loader.hide('pageLoader');
          },
          error => {
            this.loader.hide('pageLoader');
            this.logger.error('Error fetching users list', error);
          }));
  }

  decodeUserStatus() {
    // decode user status
    for (let i = 0; i < this.datasets.users.length; i++) {
      const u = this.datasets.users[i];

      if (u.deletedAt) {
        u.status = 'Apagado';
      } else if (!u.isActive && u.deactivatedAt) {
        u.status = 'Inativo';
      } else if (u.isActive) {
        u.status = 'Ativo';
      } else {
        u.status = 'Pendente';
      }
    }
  }

  deactivateUser(user) {
    if ( !confirm( this.translate('messages.alerts.are_you_sure_deactivate_user', { user: user.authId }) ) ) {
      return;
    }

    this.loader.show('pageLoader');

    this.usersService.deactivateUser(user.authId).subscribe(
      (result: { resultCode: number }) => {
        if (result.resultCode === 200) {
          return this.onSearch();
        }

        this.loader.hide('pageLoader');
        this.notification.error(this.translate('messages.errors.unable_to_deactivate_user'));
      },
      error => {
        this.loader.hide('pageLoader');
        this.notification.error(this.translate('messages.errors.unable_to_deactivate_user'));
        this.logger.error('Error fetching users list', error);
      });
  }

  deleteUser(user) {
    if ( !confirm( this.translate('messages.alerts.are_you_sure_delete_user', { user: user.authId }) ) ) {
      return;
    }

    this.loader.show('pageLoader');

    this.usersService.deleteUser(user.authId).subscribe(
      (result: { resultCode: number }) => {
        if (result.resultCode === 200) {
          return this.onSearch();
        }

        this.loader.hide('pageLoader');
        this.notification.error(this.translate('messages.errors.unable_to_delete_user'));
      },
      error => {
        this.loader.hide('pageLoader');
        this.notification.error(this.translate('messages.errors.unable_to_delete_user'));
        this.logger.error('Error fetching users list', error);
      });
  }

  confirmUser(user) {
    this.loader.show('pageLoader');

    this.usersService.confirmAccount(user.activationToken, user.confirmationCode).subscribe(
      (result: { resultCode: number }) => {
        if (result.resultCode === 200) {
          this.notification.success( this.translate('messages.success.user_successfully_confirmed', { user: user.authId }) );
          return this.onSearch();
        }

        this.loader.hide('pageLoader');
        this.notification.error(this.translate('messages.errors.unable_to_confirm_user'));
      },
      error => {
        this.loader.hide('pageLoader');
        this.notification.error(this.translate('messages.errors.unable_to_confirm_user'));
        this.logger.error('Error confirming user', error);
      });
  }
}
