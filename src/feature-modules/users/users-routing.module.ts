import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from '@core-modules/main-layout';

import { UserUpdateInfoComponent } from '@users-feature-module/pages/user-update-info.component';
import { UsersListComponent } from '@users-feature-module/pages/users-list.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-info',
        pathMatch: 'full'
      },
      {
        path: 'my-info',
        component: UserUpdateInfoComponent,
        pathMatch: 'full'
      },
      {
        path: 'admin',
        component: UsersListComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
