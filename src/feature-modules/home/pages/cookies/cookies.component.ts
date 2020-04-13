import { AfterViewInit, Component, OnInit } from '@angular/core';

import { BasePageComponent } from '@core-modules/main-layout';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent extends BasePageComponent implements OnInit, AfterViewInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.loader.show('pageLoader');
  }

  ngAfterViewInit() {
    this.loader.hide('pageLoader');

    document.getElementById('kt_quick_panel_close_btn').click();
  }
}
