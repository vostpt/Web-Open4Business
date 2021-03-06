import { AfterViewInit, Component, OnInit } from '@angular/core';

import { BasePageComponent } from '@core-modules/main-layout';

@Component({
  selector: 'app-authentication-signup-success-submission',
  templateUrl: './success-submission.component.html',
  styleUrls: ['./success-submission.component.scss']
})
export class SignupSuccessSubmissionComponent extends BasePageComponent implements OnInit, AfterViewInit {

  showInformationBanner = true;

  constructor() {
    super();
  }

  ngOnInit() {
    this.loader.show('pageLoader');
  }

  ngAfterViewInit() {
    this.loader.hide('pageLoader');
  }

  dismissInformationBanner() {
    this.showInformationBanner = false;
  }

}
