import { NgModule } from '@angular/core';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { MomentModule } from 'ngx-moment';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { HomeRoutingModule } from './home-routing.module';

import { SimpleMapComponent } from './pages/simple-map/simple-map.component';
import { SmallMediumCompaniesComponent } from '@home-feature-module/pages/small-medium-companies/small-medium-companies.component';
import { ListComponent } from './pages/list/list.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { AboutComponent } from './pages/about/about.component';

import { HomeService } from './services/home.service';
import { MapService } from './services/map.service';
import { ParserService } from '@core-modules/core/services/parser.service';

@NgModule({
  imports: [
    MainLayoutModule,
    CatalogModule,

    DropzoneModule,
    MomentModule,
    HomeRoutingModule
  ],
  declarations: [
    SimpleMapComponent,
    SmallMediumCompaniesComponent,
    ListComponent,
    CookiesComponent,
    AboutComponent
  ],
  providers: [
    HomeService,
    MapService,
    ParserService
  ]
})
export class HomeModule { }
