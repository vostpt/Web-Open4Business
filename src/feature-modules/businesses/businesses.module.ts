import { NgModule } from '@angular/core';
// Modals.
import { ChooseCoordinatesFromMapModalComponent } from '@businesses-feature-module/modals/choose-coordinates-from-map-modal.component';
import { LocationsInsertComponent } from '@businesses-feature-module/pages/locations/locations-insert.component';
import { LocationsListComponent } from '@businesses-feature-module/pages/locations/locations-list.component';
import { LocationsSuccessSubmissionComponent } from '@businesses-feature-module/pages/locations/success-submission.component';
import { CatalogModule } from '@core-modules/catalog';
import { ParserService } from '@core-modules/core/services/parser.service';
import { MainLayoutModule } from '@core-modules/main-layout';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { MomentModule } from 'ngx-moment';
import { BusinessesRoutingModule } from './businesses-routing.module';
import { ConfirmAccountComponent } from './pages/confirm-account/confirm-account.component';
import { LocationsBatchesComponent } from './pages/locations/locations-batches.component';
import { LocationsConfirmComponent } from './pages/locations/locations-confirm.component';
// Services.
import { BusinessesService } from './services/businesses.service';

@NgModule({
  imports: [
    MainLayoutModule, CatalogModule,

    DropzoneModule, MomentModule, BusinessesRoutingModule
  ],
  declarations: [
    LocationsInsertComponent, LocationsListComponent, LocationsConfirmComponent,
    LocationsBatchesComponent, LocationsSuccessSubmissionComponent,
    ConfirmAccountComponent,

    // Modals.
    ChooseCoordinatesFromMapModalComponent,
  ],
  providers: [BusinessesService, ParserService]
})

export class BusinessesModule {
}
