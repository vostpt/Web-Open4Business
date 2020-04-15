import { NgModule } from '@angular/core';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { BusinessesRoutingModule } from './businesses-routing.module';

import { LocationsComponent } from '@businesses-feature-module/pages/locations/locations.component';
import { LocationsSuccessSubmissionComponent } from '@businesses-feature-module/pages/locations/success-submission.component';

import { BusinessesService } from './services/businesses.service';

@NgModule({
  imports: [
    MainLayoutModule,
    CatalogModule,

    DropzoneModule,

    BusinessesRoutingModule
  ],
  declarations: [
    LocationsComponent,
    LocationsSuccessSubmissionComponent
  ],
  providers: [
    BusinessesService
  ]
})

export class BusinessesModule { }
