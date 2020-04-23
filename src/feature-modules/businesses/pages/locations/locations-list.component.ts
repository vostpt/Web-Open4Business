import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BusinessesService} from '@businesses-feature-module/services/businesses.service';
import {FormsService} from '@core-modules/catalog/modules/forms';
import {CheckboxComponent} from '@core-modules/catalog/modules/forms/components/checkbox/checkbox.component';
import {SelectComponent} from '@core-modules/catalog/modules/forms/components/select/select.component';
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
  public batch: {
    batchId: string,
    status: string,
    personName: string,
    personEmail: string,
    personPhone: string,
    updatedAt: number,
    stats: {total: number, sucess: number, ignored: number}
  } = null;

  contentReady = false;
  datasets = {
    user: {companyType: ''},
    locations: [],
    batches: [],
    hourOfDays: [{id: '00:00'}, {id: '00:30'}, {id: '01:00'}],
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
                                this.formatWeekdaysListProperty(
                                    item[`schedule${i}Dow`]);
                            item[`schedule${i}Formatted`] =
                                this.formatScheduleProperty(
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
                      result[0]['data'].company.companyType ||
                      'small';  // TODO: TMP!

                  // Locations call!
                  const resultData = result[1];
                  this.datasets.locations =
                      resultData['data'].locations.map(item => {
                        for (let i = 1; i <= 3; i++) {
                          if (item[`schedule${i}Dow`]) {
                            item[`schedule${i}DowFormatted`] =
                                this.formatWeekdaysListProperty(
                                    item[`schedule${i}Dow`]);
                            item[`schedule${i}Formatted`] =
                                this.formatScheduleProperty(
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
    if (!property) {
      return '';
    }

    try {
      return property.replace(/ /g, '')
          .split('-')
          .map(day => day.substring(0, 5))
          .join(' às ');
    } catch (error) {
      console.log('formatScheduleProperty', property, error);
      return '';
    }
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

    if (this.companyTypeSmall) {
      if (this.ef.schedule1StartHour.value && this.ef.schedule1EndHour.value) {
        this.ef.schedule1.setValue(`${this.ef.schedule1StartHour.value}-${
            this.ef.schedule1EndHour.value}`);
      }
      if (this.ef.schedule2StartHour.value && this.ef.schedule2EndHour.value) {
        this.ef.schedule1.setValue(`${this.ef.schedule1StartHour.value}-${
            this.ef.schedule1EndHour.value}`);
      }
      if (this.ef.schedule3StartHour.value && this.ef.schedule3EndHour.value) {
        this.ef.schedule1.setValue(`${this.ef.schedule1StartHour.value}-${
            this.ef.schedule1EndHour.value}`);
      }

      // Necessary to order the days.
      this.ef.schedule1Dow.setValue(
          this.datasets.daysOfWeek
              .map(day => {
                return (
                    this.ef.schedule1DowChoices.value.includes(day) ? day :
                                                                      null);
              })
              .filter(n => n)
              .join(', '));

      this.ef.schedule2Dow.setValue(
          this.datasets.daysOfWeek
              .map(day => {
                return (
                    this.ef.schedule2DowChoices.value.includes(day) ? day :
                                                                      null);
              })
              .filter(n => n)
              .join(', '));

      this.ef.schedule3Dow.setValue(
          this.datasets.daysOfWeek
              .map(day => {
                return (
                    this.ef.schedule3DowChoices.value.includes(day) ? day :
                                                                      null);
              })
              .filter(n => n)
              .join(', '));
    }

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

  filterBatch(batch: {
    batchId: string,
    status: string,
    personName: string,
    personEmail: string,
    personPhone: string,
    updatedAt: number,
    stats: {total: number, sucess: number, ignored: number}
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