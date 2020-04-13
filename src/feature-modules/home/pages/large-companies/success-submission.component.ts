import { AfterViewInit, Component, OnInit } from '@angular/core';

import { BasePageComponent } from '@core-modules/main-layout';

@Component({
  selector: 'app-home-large-companies-success-submission',
  templateUrl: './success-submission.component.html',
  styleUrls: ['./success-submission.component.scss']
})
export class LargeCompaniesSuccessSubmissionComponent extends BasePageComponent implements OnInit, AfterViewInit {

  showInformationBanner = true;

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

  dismissInformationBanner() {
    this.showInformationBanner = false;
  }

}
