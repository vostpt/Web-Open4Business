import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BusinessesService} from '@businesses-feature-module/services/businesses.service';
import {CheckboxComponent} from '@core-modules/catalog/modules/forms/components/checkbox/checkbox.component';
import {SelectComponent} from '@core-modules/catalog/modules/forms/components/select/select.component';
import {environment} from '@core-modules/core';
import {ParserService} from '@core-modules/core/services/parser.service';
import {BasePageComponent} from '@core-modules/main-layout';
import {forkJoin} from 'rxjs';


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
  public exportUrl =
      `${environment.apiUrl}/businesses/v1/locations/export?token=${
          localStorage.getItem('token')}`;
  public exportSearch = '';
  public batch: {
    batchId: string,
    status: string,
    personName: string,
    personEmail: string,
    personPhone: string,
    updatedAt: number,
    stats: {total: number, added: number, updated: number, ignored: number}
  } = null;

  contentReady = false;
  datasets = {
    user: {companyType: ''},
    locations: [],
    batches: [],
    hourOfDays:
        [
          {id: '00:00'}, {id: '00:30'}, {id: '01:00'}, {id: '01:30'},
          {id: '02:00'}, {id: '02:30'}, {id: '03:00'}, {id: '03:30'},
          {id: '04:00'}, {id: '04:30'}, {id: '05:00'}, {id: '05:30'},
          {id: '06:00'}, {id: '06:30'}, {id: '07:00'}, {id: '07:30'},
          {id: '08:00'}, {id: '08:30'}, {id: '09:00'}, {id: '09:30'},
          {id: '10:00'}, {id: '10:30'}, {id: '11:00'}, {id: '11:30'},
          {id: '12:00'}, {id: '12:30'}, {id: '13:00'}, {id: '13:30'},
          {id: '14:00'}, {id: '14:30'}, {id: '15:00'}, {id: '15:30'},
          {id: '16:00'}, {id: '16:30'}, {id: '17:00'}, {id: '17:30'},
          {id: '18:00'}, {id: '18:30'}, {id: '19:00'}, {id: '19:30'},
          {id: '20:00'}, {id: '20:30'}, {id: '21:00'}, {id: '21:30'},
          {id: '22:00'}, {id: '22:30'}, {id: '23:00'}, {id: '23:30'}
        ],
    daysOfWeek:
        ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo']
  };

  get companyTypeSmall() {
    return this.datasets.user.companyType === 'small';
  }
  get companyTypeBig() {
    return this.datasets.user.companyType === 'big';
  }

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
      private readonly parserService: ParserService,
      private readonly businessesService: BusinessesService) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({search: [null, null]});

    this.editForm = this.formBuilder.group({
      locationId: [null, Validators.required],
      company: [null, Validators.required],
      store: [null, Validators.required],
      address: [null, null],
      fregesia: [null, null],
      concelho: [null, null],
      district: [null, null],
      zipCode: [null, null],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      phone: [null, null],
      sector: [null, null],

      schedule1: [null, null],
      schedule1Dow: [null, null],
      schedule1Type: [null, null],
      schedule1Period: [null, null],

      schedule1StartHour: null,  // Auxiliary fields for simples forms!
      schedule1EndHour: null,
      schedule1DowChoices: this.formBuilder.array([]),

      schedule2: [null, null],
      schedule2Dow: [null, null],
      schedule2Type: [null, null],
      schedule2Period: [null, null],

      schedule2StartHour: null,  // Auxiliary fields for simples forms!
      schedule2EndHour: null,
      schedule2DowChoices: this.formBuilder.array([]),

      schedule3: [null, null],
      schedule3Dow: [null, null],
      schedule3Type: [null, null],
      schedule3Period: [null, null],

      schedule3StartHour: null,  // Auxiliary fields for simples forms!
      schedule3EndHour: null,
      schedule3DowChoices: this.formBuilder.array([]),

      byAppointment: [SelectComponent, null],
      contactForSchedule: [null, null],
      typeOfService: [null, null],
      obs: [null, null],
      isOpen: [CheckboxComponent, null],
    });

    this.getAll();
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
      this.exportSearch = '&search=' + search;
    }

    if (this.batch) {
      filter = {...filter, batchId: this.batch.batchId};
    }

    this.subscriptions.push(
        this.businessesService.getLocations(filter, 50, (this.page - 1) * 50)
            .subscribe(
                result => {
                  // Locations call!
                  const resultData = result;
                  this.datasets.locations =
                      resultData['data'].locations.map(item => {
                        for (let i = 1; i <= 3; i++) {
                          if (item[`schedule${i}Dow`]) {
                            item[`schedule${i}DowFormatted`] =
                                this.parserService.formatWeekdaysListProperty(
                                    item[`schedule${i}Dow`]);
                            item[`schedule${i}Formatted`] =
                                this.parserService.formatScheduleProperty(
                                    item[`schedule${i}`]);
                          }
                        }

                        return item;
                      });

                  this.total = parseInt(resultData['data'].total);
                  this.pages = Math.ceil(this.total / 50);
                  const offset = parseInt(resultData['data'].offset);
                  this.page = offset > 0 ? Math.round(offset / 50) + 1 : 1;

                  this.loader.hide('pageLoader');
                  // document.getElementById('kt_scrolltop').click();
                },
                (error) => {
                  this.loader.hide('pageLoader');
                  this.logger.error('Error fetching map markers', error);
                }));
  }

  getAll() {
    this.loader.show('pageLoader');

    const search = this.form.get('search').value;
    let filter = {};

    if (search) {
      filter = {search};
      this.exportSearch = '&search=' + search;
    }

    if (this.batch) {
      filter = {...filter, batchId: this.batch.batchId};
    }

    this.subscriptions.push(
        forkJoin([
          this.businessesService.getUser(),
          this.businessesService.getLocations(filter, 50, (this.page - 1) * 50),
          this.businessesService.getBatches('WAITING_FOR_APPROVAL,REJECTED'),
        ])
            .subscribe(
                result => {
                  this.datasets.user.companyType =
                      result[0]['data'].company.companyType;

                  // Locations call!
                  const resultData = result[1];
                  this.datasets.locations =
                      resultData['data'].locations.map(item => {
                        for (let i = 1; i <= 3; i++) {
                          if (item[`schedule${i}Dow`]) {
                            item[`schedule${i}DowFormatted`] =
                                this.parserService.formatWeekdaysListProperty(
                                    item[`schedule${i}Dow`]);
                            item[`schedule${i}Formatted`] =
                                this.parserService.formatScheduleProperty(
                                    item[`schedule${i}`]);
                          }
                        }

                        return item;
                      });

                  this.total = parseInt(resultData['data'].total);
                  this.pages = Math.ceil(this.total / 50);
                  const offset = parseInt(resultData['data'].offset);
                  this.page = offset > 0 ? Math.round(offset / 50) + 1 : 1;

                  // Load batches
                  const batchesData = result[2];
                  this.datasets.batches = batchesData['data'].batches;

                  this.contentReady = true;
                  this.loader.hide('pageLoader');
                  // document.getElementById('kt_scrolltop').click();
                },
                (error) => {
                  this.loader.hide('pageLoader');
                  this.logger.error('Error fetching map markers', error);
                }));
  }

  onSearch() {
    this.loader.show('app-map');
    this.page = 1;
    this.getLocations();
  }


  onCheckboxChange(e, field) {
    console.log(e.target.value);
    const checkboxField: FormArray = this.editForm.get(field) as FormArray;
    console.log(checkboxField);

    if (e.target.checked) {
      checkboxField.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkboxField.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkboxField.removeAt(i);
          return;
        }
        i++;
      });
    }
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

      setTimeout(() => {
        // Fill schedule fields
        for (let i = 1; i <= 3; i++) {
          if (location[`schedule${i}`]) {
            let hours = location[`schedule${i}`].split('-');
            this.editForm.controls[`schedule${i}StartHour`].setValue(
                hours[0].substring(0, 5));
                
            if (hours && hours.length > 1) {
              this.editForm.controls[`schedule${i}EndHour`].setValue(
                  hours[1].substring(0, 5));
            }
          }

          if (location[`schedule${i}Dow`]) {
            let days = location[`schedule${i}Dow`].split(',');

            days.forEach((d) => {
              if (document.getElementById(
                      `schedule${i}DowChoices-${d.trim()}`)) {
                this.editForm.controls[`schedule${i}DowChoices`].value.push(d);
                document.getElementById(
                    `schedule${i}DowChoices-${d.trim()}`)['checked'] = true
              }
            });
          }
        }
      }, 50);
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
    this.loader.show('pageLoader');


    if (this.ef.schedule1StartHour.value && this.ef.schedule1EndHour.value) {
      this.ef.schedule1.setValue(`${this.ef.schedule1StartHour.value}-${
          this.ef.schedule1EndHour.value}`);
    }
    if (this.ef.schedule2StartHour.value && this.ef.schedule2EndHour.value) {
      this.ef.schedule2.setValue(`${this.ef.schedule2StartHour.value}-${
          this.ef.schedule2EndHour.value}`);
    }
    if (this.ef.schedule3StartHour.value && this.ef.schedule3EndHour.value) {
      this.ef.schedule3.setValue(`${this.ef.schedule3StartHour.value}-${
          this.ef.schedule3EndHour.value}`);
    }

    // Necessary to order the days.
    this.ef.schedule1Dow.setValue(
        this.datasets.daysOfWeek
            .map(day => {
              return (
                  this.ef.schedule1DowChoices.value.includes(day) ? day : null);
            })
            .filter(n => n)
            .join(','));

    this.ef.schedule2Dow.setValue(
        this.datasets.daysOfWeek
            .map(day => {
              return (
                  this.ef.schedule2DowChoices.value.includes(day) ? day : null);
            })
            .filter(n => n)
            .join(','));

    this.ef.schedule3Dow.setValue(
        this.datasets.daysOfWeek
            .map(day => {
              return (
                  this.ef.schedule3DowChoices.value.includes(day) ? day : null);
            })
            .filter(n => n)
            .join(','));

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

                  if (error.error) {
                    this.notification.error(`${error.error.resultMessage}`);
                  } else {
                    this.notification.error(
                        `Não foi possível atualizar a Loja.`);
                  }

                  this.logger.error('Error saving location', error.error);
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

  filterBatch(batch: {
    batchId: string,
    status: string,
    personName: string,
    personEmail: string,
    personPhone: string,
    updatedAt: number,
    stats: {total: number, added: number, updated, ignored: number}
  }) {
    this.batch = batch;

    this.onSearch();
  }

  cancelBatch() {
    this.batch = null;

    this.onSearch();
  }

  submitBatch(batchId: string, submit: boolean) {
    this.loader.show('pageLoader');

    this.subscriptions.push(
        this.businessesService.submitBatch(batchId, submit)
            .subscribe(
                (result: {resultCode}) => {
                  if (result.resultCode == 200) {
                    this.editing = false;
                    this.notification.success('Batch submetido com sucesso.');

                    this.batch = null;
                    this.onSearch();

                    // Reload batches
                    this.subscriptions.push(
                        this.businessesService
                            .getBatches('WAITING_FOR_APPROVAL,REJECTED')
                            .subscribe(
                                result => {
                                  // Load batches
                                  const batchesData = result;
                                  this.datasets.batches =
                                      batchesData['data'].batches;
                                },
                                (error) => {
                                  this.logger.error(
                                      'Error fetching map markers', error);
                                }));
                  } else {
                    this.notification.error(
                        `Não foi possível submeter o batch selecionado.`);
                  }

                  this.loader.hide('pageLoader');
                },
                (error) => {
                  this.loader.hide('pageLoader');
                  this.logger.error('Error submiting batch', error);
                  this.notification.error(
                      `Não foi possível submeter o batch selecionado.`);
                }));
  }
}