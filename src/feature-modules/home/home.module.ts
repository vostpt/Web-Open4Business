import { NgModule } from '@angular/core';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { HomeRoutingModule } from './home-routing.module';

import { AsideLeftComponent } from '@home-feature-module/components/aside-left/aside-left.component';
import { MapComponent } from '@home-feature-module/pages/map/map.component';

import { HomeService } from './services/home.service';
import { MapService } from './services/map.service';

@NgModule({
  declarations: [
    AsideLeftComponent,
    MapComponent
  ],
  imports: [
    MainLayoutModule,
    CatalogModule,

    HomeRoutingModule
  ],
  exports: [],
  providers: [
    HomeService,
    MapService
  ]
})

export class HomeModule { }
