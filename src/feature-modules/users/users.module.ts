import { NgModule } from '@angular/core';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { UsersRoutingModule } from './users-routing.module';

import { UserUpdateInfoComponent } from '@users-feature-module/pages/user-update-info.component';
import { UsersListComponent } from '@users-feature-module/pages/users-list.component';

import { UsersService } from './services/users.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { BusinessesService } from '@businesses-feature-module/services/businesses.service';


@NgModule({
  imports: [
    MainLayoutModule,
    CatalogModule,
    DropzoneModule,
    UsersRoutingModule
  ],
  declarations: [
    UserUpdateInfoComponent,
    UsersListComponent
  ],
  providers: [
    UsersService,
    BusinessesService
  ]
})

export class UsersModule { }
