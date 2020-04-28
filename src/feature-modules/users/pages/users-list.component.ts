import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BasePageComponent} from '@core-modules/main-layout';

import {UsersService} from '@users-feature-module/services/users.service';


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

  public searchPlaceholder = "pesquise por nome";
  public statusList = [{id: "true", desc: "Activos"}, {id: "false", desc: "Inactivos"}];
  private active : boolean = null;

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
      console.log('active', val);
      this.active = val;

      this.onSearch();
    });

    this.subscriptions.push(this.usersService.getUsers().subscribe(
        (result: {data: {users: object[]}}) => {
          this.datasets.users = result.data.users;

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

    this.subscriptions.push(this.usersService.getUsers(this.form.value.search, this.active)
                                .subscribe(
                                    (result: {data: {users: object[]}}) => {
                                      this.datasets.users = result.data.users;
                                      this.loader.hide('pageLoader');
                                    },
                                    error => {
                                      this.loader.hide('pageLoader');
                                      this.logger.error(
                                          'Error fetching users list', error);
                                    }));
  }
}
