import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';
import { MapLayoutComponent } from '@core-modules/main-layout/base/map-layout/map-layout.component';

// import { MapComponent } from '@home-feature-module/pages/map/map.component';
import { SimpleMapComponent } from './pages/simple-map/simple-map.component';
import { AboutComponent } from '@home-feature-module/pages/about/about.component';
import { CookiesComponent } from '@home-feature-module/pages/cookies/cookies.component';
import { SmallMediumCompaniesComponent } from '@home-feature-module/pages/small-medium-companies/small-medium-companies.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: MapLayoutComponent,
    children: [
      {
        path: '',
        component: SimpleMapComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      // {
      //   path: 'map',
      //   component: MapComponent,
      //   pathMatch: 'full',
      // },
      {
        path: 'list',
        component: ListComponent,
        pathMatch: 'full',
      },
      {
        path: 'small-medium-companies',
        component: SmallMediumCompaniesComponent,
        pathMatch: 'full',
      },
      {
        path: 'cookies',
        component: CookiesComponent,
        pathMatch: 'full',
      },
      {
        path: 'about',
        component: AboutComponent,
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
