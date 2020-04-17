import { NgModule } from '@angular/core';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { BusinessesRoutingModule } from './businesses-routing.module';

import { LocationsInsertComponent } from '@businesses-feature-module/pages/locations/locations-insert.component';
import { LocationsListComponent } from '@businesses-feature-module/pages/locations/locations-list.component';
import { LocationsSuccessSubmissionComponent } from '@businesses-feature-module/pages/locations/success-submission.component';

import { BusinessesService } from './services/businesses.service';
import { ConfirmAccountComponent } from './pages/confirm-account/confirm-account.component';

@NgModule({
  imports: [
    MainLayoutModule,
    CatalogModule,

    DropzoneModule,

    BusinessesRoutingModule
  ],
  declarations: [
    LocationsInsertComponent,
    LocationsListComponent,
    LocationsSuccessSubmissionComponent,
    ConfirmAccountComponent
  ],
  providers: [
    BusinessesService
  ]
})

export class BusinessesModule { }
