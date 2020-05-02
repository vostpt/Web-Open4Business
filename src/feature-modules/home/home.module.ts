import { NgModule } from '@angular/core';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { HomeRoutingModule } from './home-routing.module';

import { MapComponent } from '@home-feature-module/pages/map/map.component';
import { SmallMediumCompaniesComponent } from '@home-feature-module/pages/small-medium-companies/small-medium-companies.component';

import { HomeService } from './services/home.service';
import { MapService } from './services/map.service';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { AboutComponent } from './pages/about/about.component';
import { SimpleMapComponent } from './pages/simple-map/simple-map.component';
import { ParserService } from '@core-modules/core/services/parser.service';
import { ListComponent } from './pages/list/list.component';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    MainLayoutModule,
    CatalogModule,

    DropzoneModule,
    MomentModule,
    HomeRoutingModule
  ],
  declarations: [
    MapComponent,
    ListComponent,
    SimpleMapComponent,
    SmallMediumCompaniesComponent,
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
