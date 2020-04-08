import { NgModule } from '@angular/core';

import { MainLayoutModule } from '@external-modules/main-layout';
// import { CatalogModule } from '@external-modules/catalog';

import { HomeRoutingModule } from './home-routing.module';



//import { MapComponent } from '@home-feature-module/pages/map/map.component';

//import { MapService } from './pages/map/services/map.service';

@NgModule({
  declarations: [

    //MapComponent


  ],
  imports: [
    MainLayoutModule,
   // CatalogModule,

    HomeRoutingModule,


  ],
  exports: [],
  providers: [
  //  MapService
  ]
})

export class HomeModule { }
