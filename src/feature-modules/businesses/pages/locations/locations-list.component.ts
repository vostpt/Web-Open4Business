import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BusinessesService} from '@businesses-feature-module/services/businesses.service';
import {FormsService} from '@core-modules/catalog/modules/forms';
import {CheckboxComponent} from '@core-modules/catalog/modules/forms/components/checkbox/checkbox.component';
import {SelectComponent} from '@core-modules/catalog/modules/forms/components/select/select.component';
import {BasePageComponent} from '@core-modules/main-layout';


@Component({
  selector: 'app-businesses-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent extends BasePageComponent implements
    OnInit, AfterViewInit, OnDestroy {
  public searchPlaceholder = 'Pesquisar Empresas';
  public editing: boolean = false;
  public total: number = 0;
  public pages: number = 1;
  public page: number = 1;

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

  goto(page: number) {
    if (page < 1) {
      this.page = 1;
    } else if (page > this.pages) {
      this.page = this.pages;
    } else {
      this.page = page;
    }

    this.getLocations();
  }

  getLocations() {
    this.loader.show('pageLoader');

    const search = this.form.get('search').value;
    let filter = {};

    if (search) {
      filter = {search};
    }

    this.subscriptions.push(
        this.businessesService.getLocations(filter, 50, (this.page - 1) * 50)
            .subscribe(
                (result: {
                  data: {
                    total,
                    limit,
                    offset,
                    locations: object[]
                  }
                }) => {
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

                  this.total = parseInt(result.data.total);
                  this.pages = Math.ceil(this.total / 50);
                  const offset = parseInt(result.data.offset);
                  this.page = offset > 0 ?
                      Math.round(offset / 50) + 1 :
                      1;
                  
                  this.contentReady = true;
                  this.loader.hide('pageLoader');
                  document.getElementById('kt_scrolltop').click();
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
    this.page = 1;
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

    setTimeout(() => {document.getElementById('edit-company-in').focus()}, 100);
  }

  discardStoreChanges() {
    console.log('discardStoreChanges');
    this.editing = false;
  }

  saveStoreChanges() {
    console.log('saveStoreChanges', this.editForm.value);

    this.loader.show('pageLoader');

    this.subscriptions.push(
        this.businessesService.updateLocation(this.editForm.value)
            .subscribe(
                (result: {
                  resultCode: number,
                  resultMessage: string,
                  resultTimestamp: number,
                  data: any,
                  service: string,
                  traceId: string
                }) => {
                  this.loader.hide('pageLoader');

                  if (result.resultCode == 200) {
                    this.editing = false;
                    this.notification.success(
                        'Empresa atualizada com sucesso.');

                    this.getLocations();
                  } else {
                    this.notification.error(
                        `Não foi possível atualizar a Loja. [${
                            result.resultCode}] => ${result.resultMessage}`);
                  }
                },
                (error) => {
                  this.loader.hide('pageLoader');
                  this.notification.error(`Não foi possível atualizar a Loja.`);
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
                (result: any) => {
                  this.loader.hide('pageLoader');

                  if (result.resultCode == 200) {
                    this.editing = false;

                    this.notification.success('Empresa apagada com sucesso.');

                    this.getLocations();
                  } else {
                    this.notification.error(
                        `Não foi possível apagar a Loja '${location.store}'. [${
                            result.resultCode}] => ${result.resultMessage}`);
                  }
                },
                (error) => {
                  this.loader.hide('pageLoader');
                  this.notification.error(
                      `Não foi possível apagar a Loja '${location.store}'`);
                  this.logger.error('Error deleting location', error);
                }));
  }
}