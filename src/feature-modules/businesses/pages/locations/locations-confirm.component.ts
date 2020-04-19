import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { BasePageComponent } from '@core-modules/main-layout';

import { BusinessesService } from '@businesses-feature-module/services/businesses.service';
import { FormsService } from '@core-modules/catalog/modules/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-businesses-locations-confirm',
  templateUrl: './locations-confirm.component.html',
  styleUrls: ['./locations-confirm.component.scss']
})
export class LocationsConfirmComponent extends BasePageComponent implements OnInit, AfterViewInit, OnDestroy {

  public batchId :string;
  public email :string;

  contentReady = false;
  datasets = {
    locations: []
  };

  constructor(
    private readonly businessesService: BusinessesService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      this.batchId = params['batchId'];
      this.email = params['email'];

    this.getLocations();
    });

    
  }

  ngAfterViewInit() { }

  getLocations() {
    this.loader.show('pageLoader');

    const filter = {batchId: this.batchId};

    this.subscriptions.push(this.businessesService.getLocations(filter).subscribe(
      (result: { data: { locations: object[] } }) => {

        this.datasets.locations = result.data.locations.map(item => {
          for (let i = 1; i <= 3; i++) {
            if (item[`schedule${i}Dow`]) {
              item[`schedule${i}DowFormatted`] = this.formatWeekdaysListProperty(item[`schedule${i}Dow`]);
              item[`schedule${i}Formatted`] = this.formatScheduleProperty(item[`schedule${i}`]);
            }
          }
          
          return item;

        });

        this.contentReady = true;
        this.loader.hide('pageLoader');
      },
      (error) => {
        this.loader.hide('pageLoader');
        this.logger.error('Error fetching map markers', error);
      }));
  }

  formatWeekdaysListProperty(weekdays: string) {
    return weekdays
      .replace(/ /g, '')
      .split(',')
      .map((day, i, arr) => (i === 0 || arr.length - 1 === i ? day.substring(0, 3) : null))
      .filter(n => n)
      .join(' a ');
  }


  formatScheduleProperty(property: string) {
    return property
      .replace(/ /g, '')
      .split('-')
      .map(day => day.substring(0, 5))
      .join(' às ');
  }

  save(confirm) {
    console.log('save', confirm);
    const data = {
      email: this.email,
      batchId: this.batchId,
      confirm
    };

    this.subscriptions.push(this.businessesService.confirmLocations(data).subscribe(
      (result: { data: { locations: object[] } }) => {
        this.router.navigateByUrl('/businesses/locations');
      },
      (error) => {
        this.loader.hide('pageLoader');
        this.logger.error('Error confirming locations', error);
      }));
  }

}
