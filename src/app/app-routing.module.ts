import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthenticationGuard } from '@external-modules/core';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('@home-feature-module/home.module').then(m => m.HomeModule)
  },

  // {
  //   path: 'backoffice',
  //   //canActivate: [AuthenticationGuard],
  //   children: [
  //     {
  //       path: 'map',
  //       loadChildren: () => import('@home-feature-module/home.module').then(m => m.HomeModule)
  //     },
  //     {
  //       path: 'energy',
  //       loadChildren: () => import('@energy-feature-module/energy.module').then(m => m.EnergyModule)
  //     }
  //   ]
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
