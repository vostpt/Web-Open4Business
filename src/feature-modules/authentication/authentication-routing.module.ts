import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';

import { SigninComponent } from '@authentication-feature-module/pages/signin/signin.component';
import { SignupComponent } from '@authentication-feature-module/pages/signup/signup.component';
import { SignupSuccessSubmissionComponent } from '@authentication-feature-module/pages/signup/success-submission.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        pathMatch: 'full',
      },
      {
        path: 'signup',
        children: [
          {
            path: '',
            component: SignupComponent,
            pathMatch: 'full'
          },
          {
            path: 'success',
            component: SignupSuccessSubmissionComponent,
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
export class AuthenticationRoutingModule { }
