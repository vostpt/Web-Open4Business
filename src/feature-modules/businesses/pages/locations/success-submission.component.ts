import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BasePageComponent} from '@core-modules/main-layout';


@Component({
  selector: 'app-businesses-locations-success-submission',
  templateUrl: './success-submission.component.html',
  styleUrls: ['./success-submission.component.scss']
})
export class LocationsSuccessSubmissionComponent extends BasePageComponent
    implements OnInit, AfterViewInit {
  showInformationBanner = true;
  public importResult: any = {
    totalRows: 0,
    successCount: 0,
    errorCount: 0,
    errors: []
  };

  constructor() {
    super();
  }

  ngOnInit() {
    this.loader.show('pageLoader');

    const rawImportResult = localStorage.getItem('lastImportStatus');
    localStorage.removeItem('lastImportStatus');

    if (rawImportResult) {
      this.importResult = JSON.parse(rawImportResult);
    }

    // wrap errors
    for (let i = 0; i < this.importResult.errors.length; i++) {
      const error = this.importResult.errors[i];
      console.log(error);
      error.list = [];
      for (let [key, value] of Object.entries(error)) {
        console.log(`${key}: ${value}`);
        if (key != 'row' && key != 'description' && value['message']) {
          error.list.push(value['message']);
        }
      }
    }
  }

  ngAfterViewInit() {
    this.loader.hide('pageLoader');
  }

  dismissInformationBanner() {
    this.showInformationBanner = false;
  }
}
