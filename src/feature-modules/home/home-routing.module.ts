import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';

import { AsideLeftComponent } from '@home-feature-module/components/aside-left/aside-left.component';
import { MapComponent } from './pages/map/map.component';

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
        component: AsideLeftComponent,
        outlet: 'layout-aside-left'
      },
      {
        path: '',
        component: MapComponent,
        pathMatch: 'full',
        data: {
          breadcrumb: 'Overview' // TODO add translation in the future
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
