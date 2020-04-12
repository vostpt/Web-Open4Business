import { NgModule } from '@angular/core';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { HomeRoutingModule } from './home-routing.module';

import { MapComponent } from '@home-feature-module/pages/map/map.component';
import { SmallMediumCompaniesComponent } from '@home-feature-module/pages/small-medium-companies/small-medium-companies.component';
import { LargeCompaniesComponent } from '@home-feature-module/pages/large-companies/large-companies.component';

import { HomeService } from './services/home.service';
import { MapService } from './services/map.service';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  imports: [
    MainLayoutModule,
    CatalogModule,

    HomeRoutingModule
  ],
  declarations: [
    MapComponent,
    SmallMediumCompaniesComponent,
    LargeCompaniesComponent,
    CookiesComponent,
    AboutComponent
  ],
  providers: [
    HomeService,
    MapService
  ]
})

export class HomeModule { }
