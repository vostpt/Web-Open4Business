import { Injectable } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderService {

  constructor(private spinner: NgxSpinnerService) { }

  show(name: string) {
    this.spinner.show(name);
  }

  hide(name: string) {
    this.spinner.hide(name);
  }

}
