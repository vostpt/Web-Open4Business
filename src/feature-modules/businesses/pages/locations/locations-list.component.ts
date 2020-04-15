import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { BasePageComponent } from '@core-modules/main-layout';

import { BusinessesService } from '@businesses-feature-module/services/businesses.service';


@Component({
  selector: 'app-businesses-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent extends BasePageComponent implements OnInit, AfterViewInit, OnDestroy {

  contentReady = false;
  datasets = {
    locations: []
  };

  constructor(
    private readonly businessesService: BusinessesService,
  ) {
    super();
  }


  ngOnInit() {

    this.loader.show('pageLoader');

    this.subscriptions.push(this.businessesService.getLocations().subscribe(
      (result: { data: { locations: object[] } }) => {
        console.log(result.data);
        this.datasets.locations = result.data.locations;
        this.contentReady = true;
        this.loader.hide('pageLoader');
      },
      (error) => {
        this.loader.hide('pageLoader');
        this.logger.error('Error fetching map markers', error);
      }));

  }

  ngAfterViewInit() { }

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

}
