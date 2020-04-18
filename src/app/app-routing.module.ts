import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';
import { NotFoundComponent } from '@core-modules/main-layout/components/not-found/not-found.component';

import { AuthenticationGuard } from '@core-modules/core';


const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('@home-feature-module/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('@authentication-feature-module/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'businesses',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('@businesses-feature-module/businesses.module').then(m => m.BusinessesModule)
  },
  {
    path: 'users',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('@users-feature-module/users.module').then(m => m.UsersModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
