import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    data: {
      layoutOptions: {
        isAsideLeftActive: false,
        selectedMenu: 'map'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
