import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';

import { LocationsInsertComponent } from '@businesses-feature-module/pages/locations/locations-insert.component';
import { LocationsListComponent } from '@businesses-feature-module/pages/locations/locations-list.component';
import { LocationsSuccessSubmissionComponent } from '@businesses-feature-module/pages/locations/success-submission.component';
import { ConfirmAccountComponent } from './pages/confirm-account/confirm-account.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'locations/new',
        pathMatch: 'full'
      },
      {
        path: 'confirm',
        component: ConfirmAccountComponent,
        pathMatch: 'full'
      },
      {
        path: 'locations',
        children: [
          {
            path: '',
            component: LocationsListComponent,
            pathMatch: 'full'
          },
          {
            path: 'new',
            component: LocationsInsertComponent,
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
