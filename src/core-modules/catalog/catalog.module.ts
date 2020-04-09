import { NgModule } from '@angular/core';

import { FormsModule } from './modules/forms';
import { LoaderModule } from './modules/loader';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    LoaderModule
  ],
  exports: [
    FormsModule,
    LoaderModule
  ],
  providers: [],
})

export class CatalogModule { }
