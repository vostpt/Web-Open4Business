import { NgModule } from '@angular/core';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { UsersRoutingModule } from './users-routing.module';

import { UserUpdateInfoComponent } from '@users-feature-module/pages/user-update-info.component';
import { UsersListComponent } from '@users-feature-module/pages/users-list.component';

import { UsersService } from './services/users.service';


@NgModule({
  imports: [
    MainLayoutModule,
    CatalogModule,

    UsersRoutingModule
  ],
  declarations: [
    UserUpdateInfoComponent,
    UsersListComponent
  ],
  providers: [
    UsersService
  ]
})

export class UsersModule { }
