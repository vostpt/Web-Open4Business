import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessesService } from '@businesses-feature-module/services/businesses.service';
import { BasePageComponent } from '@core-modules/main-layout';

@Component({
  selector: 'app-business-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent extends BasePageComponent implements
  OnInit {
  public success = false;
  public contentReady = false;

  constructor(
    private readonly businessesService: BusinessesService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.loader.show('pageLoader');

    let token = '';
    let confirmationCode = '';

    this.route.queryParams.subscribe(params => {

      token = params['token'];
      confirmationCode = params['confirmationCode'];

      this.subscriptions.push(
        this.businessesService.confirmAccount(token, confirmationCode).subscribe(
          (result: { data: { locations: object[] } }) => {

            this.success = true;
            this.contentReady = true;
            this.loader.hide('pageLoader');
          },
          (error) => {
            this.success = false;
            this.contentReady = true;
            this.loader.hide('pageLoader');
          }
        )
      );
    });
  }
}
