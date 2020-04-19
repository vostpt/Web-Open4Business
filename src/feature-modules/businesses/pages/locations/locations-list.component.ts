import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { BasePageComponent } from '@core-modules/main-layout';

import { BusinessesService } from '@businesses-feature-module/services/businesses.service';
import { FormsService } from '@core-modules/catalog/modules/forms';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-businesses-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent extends BasePageComponent implements OnInit, AfterViewInit, OnDestroy {

  public searchPlaceholder = "Pesquisar Empresas";
  contentReady = false;
  datasets = {
    locations: []
  };

  form: FormGroup;
  get f() {
    return this.form.controls;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly formsService: FormsService,
    private readonly businessesService: BusinessesService
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({search: [null, null]});

    this.getLocations();
  }

  ngAfterViewInit() { }

  getLocations() {
    this.loader.show('pageLoader');

    const search = this.form.get('search').value;

    this.subscriptions.push(this.businessesService.getLocations(search).subscribe(
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

  onSearch() {
    this.loader.show('app-map');

    this.getLocations();
  }

}
