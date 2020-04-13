import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';

import { NotFoundComponent } from '@core-modules/main-layout/components/not-found/not-found.component';

import { MapComponent } from '@home-feature-module/pages/map/map.component';
import { SmallMediumCompaniesComponent } from '@home-feature-module/pages/small-medium-companies/small-medium-companies.component';
import { LargeCompaniesComponent } from '@home-feature-module/pages/large-companies/large-companies.component';
import { LargeCompaniesSuccessSubmissionComponent } from '@home-feature-module/pages/large-companies/success-submission.component';
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
        path: 'large-companies',
        children: [
          {
            path: '',
            component: LargeCompaniesComponent,
            pathMatch: 'full'
          },
          {
            path: 'success',
            component: LargeCompaniesSuccessSubmissionComponent,
            pathMatch: 'full'
          }
        ]
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
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
