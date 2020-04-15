import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';
import { NotFoundComponent } from '@core-modules/main-layout/components/not-found/not-found.component';

import { LocationsComponent } from '@businesses-feature-module/pages/locations/locations.component';
import { LocationsSuccessSubmissionComponent } from '@businesses-feature-module/pages/locations/success-submission.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'locations',
        children: [
          // {
          //   path: 'new',
          //   component: LargeCompaniesComponent,
          //   pathMatch: 'full'
          // },
          {
            path: 'new',
            component: LocationsComponent,
            pathMatch: 'full'
          },
          {
            path: 'success',
            component: LocationsSuccessSubmissionComponent,
            pathMatch: 'full'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessesRoutingModule { }
