import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';

import { MapComponent } from './pages/map/map.component';
import { LargeCompaniesComponent } from './pages/large-companies/large-companies.component';
import { SmallMediumCompaniesComponent } from './pages/small-medium-companies/small-medium-companies.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    data: {
      layoutOptions: {
        isAsideLeftActive: false,
        selectedMenu: 'map'
      }
    },
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
        path: 'large-companies',
        component: LargeCompaniesComponent,
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
