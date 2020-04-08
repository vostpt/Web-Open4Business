import { NgModule } from '@angular/core';

import { NgxSpinnerModule } from 'ngx-spinner';

import { LoaderComponent } from './components/loader.component';

import { LoaderService } from './services/loader.service';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    NgxSpinnerModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    LoaderService
  ]
})
export class LoaderModule { }
