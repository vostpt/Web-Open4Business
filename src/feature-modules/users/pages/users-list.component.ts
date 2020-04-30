import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasePageComponent } from '@core-modules/main-layout';
import { UsersService } from '@users-feature-module/services/users.service';




@Component({
  selector: 'app-users-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends BasePageComponent implements
    OnInit, AfterViewInit, OnDestroy {
  contentReady = false;

  form: FormGroup;
  get f() {
    return this.form.controls;
  }

  datasets = {users: []};

  public searchPlaceholder = 'pesquise por nome';
  public statusList = [
    {id: 'active', desc: 'Activos'}, {id: 'pending', desc: 'Pendentes'},
    {id: 'inactive', desc: 'Inactivos'}, {id: 'deleted', desc: 'Apagados'}
  ];
  private status: string = null;

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly usersService: UsersService,
  ) {
    super();
  }


  ngOnInit() {
    if (localStorage.getItem('isA') != 'true') {
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

    this.subscriptions.push(this.usersService.getUsers().subscribe(
        (result: {data: {users: object[]}}) => {
          this.datasets.users = result.data.users;
          this.decodeUserStatus();

          this.contentReady = true;
          this.loader.hide('pageLoader');
        },
        (error) => {
          this.contentReady = true;
          this.loader.hide('pageLoader');
          this.logger.error('Error fetching users list', error);
        }));
  }

  ngAfterViewInit() {}

  onSearch() {
    this.logger.info('form', this.form.value);

    this.loader.show('pageLoader');

    this.subscriptions.push(
        this.usersService.getUsers(this.form.value.search, this.status)
            .subscribe(
                (result: {data: {users: object[]}}) => {
                  this.datasets.users = result.data.users;
                  this.decodeUserStatus();

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
      let u = this.datasets.users[i];

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
    if (!confirm(`Tem a certeza que deseja desativar o utilizador "${user.authId}"?`)) {
      return;
    }

    this.loader.show('pageLoader');

    this.usersService.deactivateUser(user.authId).subscribe(
      (result: {resultCode: number}) => {
        if (result.resultCode == 200) {
          return this.onSearch();
        }

        this.loader.hide('pageLoader');
        this.notification.error("Não foi possível desativar o utilizador.");
      },
      error => {
        this.loader.hide('pageLoader');
        this.notification.error("Não foi possível desativar o utilizador.");

        this.logger.error('Error fetching users list', error);
      });
  }

  deleteUser(user) {
    if (!confirm(`Tem a certeza que deseja apagar o utilizador "${user.authId}"?`)) {
      return;
    }

    this.loader.show('pageLoader');

    this.usersService.deleteUser(user.authId).subscribe(
      (result: {resultCode: number}) => {
        if (result.resultCode == 200) {
          return this.onSearch();
        }

        this.loader.hide('pageLoader');
        this.notification.error("Não foi possível apagar o utilizador.");
      },
      error => {
        this.loader.hide('pageLoader');
        this.notification.error("Não foi possível apagar o utilizador.");
        
        this.logger.error('Error fetching users list', error);
      });
  }
}
