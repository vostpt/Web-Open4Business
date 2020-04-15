import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';

import { MapComponent } from '@home-feature-module/pages/map/map.component';
import { SmallMediumCompaniesComponent } from '@home-feature-module/pages/small-medium-companies/small-medium-companies.component';
import { CookiesComponent } from '@home-feature-module/pages/cookies/cookies.component';
import { AboutComponent } from '@home-feature-module/pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: MapComponent,
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
