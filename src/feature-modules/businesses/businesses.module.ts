import { NgModule } from '@angular/core';
import { MomentModule } from 'ngx-moment';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { BusinessesRoutingModule } from './businesses-routing.module';

import { LocationsInsertComponent } from '@businesses-feature-module/pages/locations/locations-insert.component';
import { LocationsListComponent } from '@businesses-feature-module/pages/locations/locations-list.component';
import { LocationsSuccessSubmissionComponent } from '@businesses-feature-module/pages/locations/success-submission.component';

// Modals.
import { ChooseCoordinatesFromMapModalComponent } from '@businesses-feature-module/modals/choose-coordinates-from-map-modal.component';

// Services.
import { BusinessesService } from './services/businesses.service';
import { ConfirmAccountComponent } from './pages/confirm-account/confirm-account.component';
import { LocationsConfirmComponent } from './pages/locations/locations-confirm.component';
import { LocationsBatchesComponent } from './pages/locations/locations-batches.component';
import { ParserService } from '@core-modules/core/services/parser.service';

@NgModule({
  imports: [
    MainLayoutModule,
    CatalogModule,

    DropzoneModule,
    MomentModule,
    BusinessesRoutingModule
  ],
  declarations: [
    LocationsInsertComponent,
    LocationsListComponent,
    LocationsConfirmComponent,
    LocationsBatchesComponent,
    LocationsSuccessSubmissionComponent,
    ConfirmAccountComponent,

    // Modals.
    ChooseCoordinatesFromMapModalComponent
  ],
  providers: [
    BusinessesService,
    ParserService
  ]
})

export class BusinessesModule { }
