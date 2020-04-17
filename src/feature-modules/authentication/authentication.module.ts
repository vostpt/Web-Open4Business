import { NgModule } from '@angular/core';

import { MainLayoutModule } from '@core-modules/main-layout';
import { CatalogModule } from '@core-modules/catalog';

import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { SigninComponent } from '@authentication-feature-module/pages/signin/signin.component';
import { SignupComponent } from '@authentication-feature-module/pages/signup/signup.component';
import { SignupSuccessSubmissionComponent } from '@authentication-feature-module/pages/signup/success-submission.component';

import { AuthenticationService } from './services/authentication.service';
import { SignoutComponent } from './pages/signout/signout.component';

@NgModule({
  imports: [
    MainLayoutModule,
    CatalogModule,

    DropzoneModule,

    AuthenticationRoutingModule
  ],
  declarations: [
    SigninComponent,
    SignoutComponent,
    SignupComponent,
    SignupSuccessSubmissionComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
