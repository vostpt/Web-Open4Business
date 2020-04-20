import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BusinessesService} from '@businesses-feature-module/services/businesses.service';
import {FormsService} from '@core-modules/catalog/modules/forms';
import {BasePageComponent} from '@core-modules/main-layout';
import { SelectComponent } from '@core-modules/catalog/modules/forms/components/select/select.component';
import { CheckboxComponent } from '@core-modules/catalog/modules/forms/components/checkbox/checkbox.component';


@Component({
  selector: 'app-businesses-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent extends BasePageComponent implements
    OnInit, AfterViewInit, OnDestroy {
  public searchPlaceholder = 'Pesquisar Empresas';
  public editing: boolean = false;

  contentReady = false;
  datasets = {locations: []};

  form: FormGroup;
  get f() {
    return this.form.controls;
  }

  editForm: FormGroup;
  get ef() {
    return this.editForm.controls;
  }

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly formsService: FormsService,
      private readonly businessesService: BusinessesService) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({search: [null, null]});

    this.editForm = this.formBuilder.group({
      locationId: [null, Validators.required],
      company: [null, Validators.required],
      store: [null, Validators.required],
      address: [null, Validators.required],
      fregesia: [null, Validators.required],
      concelho: [null, Validators.required],
      district: [null, Validators.required],
      zipCode: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      phone: [null, null],
      sector: [null, Validators.required],

      schedule1: [null, Validators.required],
      schedule1Dow: [null, Validators.required],
      schedule1Type: [null, Validators.required],
      schedule1Period: [null, Validators.required],

      schedule2: [null, null],
      schedule2Dow: [null, null],
      schedule2Type: [null, null],
      schedule2Period: [null, null],

      schedule3: [null, null],
      schedule3Dow: [null, null],
      schedule3Type: [null, null],
      schedule3Period: [null, null],

      byAppointment: [SelectComponent, null],
      contactForSchedule: [null, null],
      typeOfService: [null, null],
      obs: [null, null],
      isOpen: [CheckboxComponent, null],
    });

    this.getLocations();
  }

  ngAfterViewInit() {}

  getLocations() {
    this.loader.show('pageLoader');

    const search = this.form.get('search').value;

    this.subscriptions.push(
        this.businessesService.getLocations(search).subscribe(
            (result: {data: {locations: object[]}}) => {
              this.datasets.locations = result.data.locations.map(item => {
                for (let i = 1; i <= 3; i++) {
                  if (item[`schedule${i}Dow`]) {
                    item[`schedule${i}DowFormatted`] =
                        this.formatWeekdaysListProperty(
                            item[`schedule${i}Dow`]);
                    item[`schedule${i}Formatted`] =
                        this.formatScheduleProperty(item[`schedule${i}`]);
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
    return weekdays.replace(/ /g, '')
        .split(',')
        .map(
            (day, i, arr) =>
                (i === 0 || arr.length - 1 === i ? day.substring(0, 3) : null))
        .filter(n => n)
        .join(' a ');
  }


  formatScheduleProperty(property: string) {
    return property.replace(/ /g, '')
        .split('-')
        .map(day => day.substring(0, 5))
        .join(' às ');
  }

  onSearch() {
    this.loader.show('app-map');

    this.getLocations();
  }

  editStore(location) {
    this.editing = true;

    if (location) {
      for (let [key, value] of Object.entries(location)) {
        try {
          if (this.editForm.controls[key]) {
            this.editForm.controls[key].setValue(value);
          }
        } catch (e) {
          console.warn(e);
        }
      }
    } else {
      this.editForm.reset();
    }

    setTimeout(() => {document.getElementById("edit-company-in").focus()}, 100);
  }

  discardStoreChanges() {
    console.log('discardStoreChanges');
    this.editing = false;
  }

  saveStoreChanges() {
    console.log('saveStoreChanges', this.editForm.value);

    this.loader.show('pageLoader');

    this.subscriptions.push(
        this.businessesService.updateLocation(this.editForm.value).subscribe(
            (result: {data: {locations: object[]}}) => {
              this.loader.hide('pageLoader');
              this.editing = false;

              this.getLocations();
            },
            (error) => {
              this.loader.hide('pageLoader');
              this.logger.error('Error fetching map markers', error);
            }));
  }

  deleteStore(location) {
    console.log('deleteStore', location);

    if (!confirm(
            `Tem a certeza que deseja apagar a loja '${location.store}'`)) {
      return;
    }
    this.loader.show('pageLoader');

    this.subscriptions.push(
        this.businessesService.deleteLocation(location.locationId)
            .subscribe(
                (result: {data: {locations: object[]}}) => {
                  this.loader.hide('pageLoader');
                  console.log(result);

                  this.getLocations();
                },
                (error) => {
                  this.loader.hide('pageLoader');
                  this.logger.error('Error fetching map markers', error);
                }));
  }
}
