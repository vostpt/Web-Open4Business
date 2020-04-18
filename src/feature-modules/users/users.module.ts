import { NgModule } from '@angular/core';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { UsersRoutingModule } from './users-routing.module';

import { UsersListComponent } from '@users-feature-module/pages/users-list.component';

import { UsersService } from './services/users.service';


@NgModule({
  imports: [
    MainLayoutModule,
    CatalogModule,

    UsersRoutingModule
  ],
  declarations: [
    UsersListComponent
  ],
  providers: [
    UsersService
  ]
})

export class UsersModule { }
