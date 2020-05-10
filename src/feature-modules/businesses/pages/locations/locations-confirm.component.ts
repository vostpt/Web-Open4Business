import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ChooseCoordinatesFromMapModalComponent } from '@businesses-feature-module/modals/choose-coordinates-from-map-modal.component';
import { BusinessesService } from '@businesses-feature-module/services/businesses.service';
import { ParserService } from '@core-modules/core/services/parser.service';
import { BasePageComponent } from '@core-modules/main-layout';
import { SelectComponent } from '@core-modules/catalog/modules/forms/components/select/select.component';
import { CheckboxComponent } from '@core-modules/catalog/modules/forms/components/checkbox/checkbox.component';

@Component({
  selector: 'app-businesses-locations-confirm',
  templateUrl: './locations-confirm.component.html',
  styleUrls: ['./locations-confirm.component.scss']
})
export class LocationsConfirmComponent extends BasePageComponent implements
    OnInit, AfterViewInit, OnDestroy {
  public batchId: string;
  public editing = false;
  public total = 0;
  public pages = 1;
  public page = 1;
  public isAdmin = false;

  contentReady = false;
  datasets = {
    locations: [],
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

  public batch: {
    batchId: string,
    status: string,
    personName: string,
    personEmail: string,
    personPhone: string,
    updatedAt: number,
    stats: {total: number, added: number, updated: number, ignored: number}
  } = null;

  editForm: FormGroup;
  get ef() {
    return this.editForm.controls;
  }

  constructor(
      private readonly dialog: MatDialog,
      private readonly formBuilder: FormBuilder,
      private readonly businessesService: BusinessesService,
      private readonly parserService: ParserService,
      private route: ActivatedRoute) {
    super();

    this.isAdmin =
        (localStorage.getItem('token') && localStorage.getItem('email') &&
                 localStorage.getItem('isA') === 'true' ?
             true :
             false);
  }

  ngOnInit() {
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

    this.route.queryParams.subscribe(params => {
      this.batchId = params['batchId'];

      if (this.batchId) {
        this.getLocations();
      } else {
        location.href = '/businesses/locations/batches';
      }
    });
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

    const filter = {batchId: this.batchId};

    this.subscriptions.push(this.businessesService.getBatch(this.batchId)
                                .subscribe(
                                    (result: {
                                      data: {
                                        batch: {
                                          batchId: string,
                                          status: string,
                                          personName: string,
                                          personEmail: string,
                                          personPhone: string,
                                          updatedAt: number,
                                          stats: {
                                            total: number,
                                            added: number,
                                            updated: number,
                                            ignored: number
                                          }
                                        }
                                      }
                                    }) => {
                                      this.batch = result.data.batch;
                                    },
                                    (error) => {
                                      this.loader.hide('pageLoader');
                                      this.logger.error(
                                          'Error fetching batch', error);
                                    }));

    this.subscriptions.push(
        this.businessesService.getLocations(filter, 50, (this.page - 1) * 50)
            .subscribe(
                (result:
                     {data: {total, limit, offset, locations: object[]}}) => {
                  this.datasets.locations = result.data.locations.map(item => {
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

                  this.total = parseInt(result.data.total, 10);
                  this.pages = Math.ceil(this.total / 50);
                  const offset = parseInt(result.data.offset, 10);
                  this.page = offset > 0 ? Math.round(offset / 50) + 1 : 1;

                  this.contentReady = true;
                  this.loader.hide('pageLoader');
                  document.getElementById('kt_scrolltop').click();
                },
                (error) => {
                  this.loader.hide('pageLoader');
                  this.logger.error('Error fetching map markers', error);
                }));
  }

  save(confirm) {
    const data = {
      email: this.batch.personEmail,
      batchId: this.batchId,
      confirm
    };

    this.subscriptions.push(
        this.businessesService.confirmLocations(data).subscribe(
            (result: {data: {locations: object[]}}) => {
              this.router.navigateByUrl('/businesses/locations/batches');
            },
            (error) => {
              this.loader.hide('pageLoader');
              this.logger.error('Error confirming locations', error);
            }));
  }

  onCheckboxChange(e, field) {
    const checkboxField: FormArray = this.ef[field] as FormArray;

    if (e.target.checked) {
      checkboxField.value.push(e.target.value);
    } else {
      let i = 0;
      this.ef[field].value.forEach((item: FormControl) => {
        if (item === e.target.value) {
          checkboxField.value.splice(i, 1);
          return;
        }
        i++;
      });
    }
  }

  openMapToChooseCoordinates() {
    const dialogRef = this.dialog.open(ChooseCoordinatesFromMapModalComponent, {
      width: '80%',
      data:
          (this.ef.latitude.value && this.ef.longitude.value ?
               {lat: this.ef.latitude.value, lng: this.ef.longitude.value} :
               null)
    });

    dialogRef.afterClosed().subscribe((result: {lat: number, lng: number}) => {
      if (result) {
        this.ef.latitude.setValue(Math.round(result.lat * 1000000) / 1000000);
        this.ef.longitude.setValue(Math.round(result.lng * 1000000) / 1000000);
      }
    });
  }

  editStore(location) {
    this.editing = true;

    if (location) {
      for (const [key, value] of Object.entries(location)) {
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
            const hours = location[`schedule${i}`].split('-');
            this.editForm.controls[`schedule${i}StartHour`].setValue(
                hours[0].substring(0, 5));

            if (hours && hours.length > 1) {
              this.editForm.controls[`schedule${i}EndHour`].setValue(
                  hours[1].substring(0, 5));
            }
          }

          if (location[`schedule${i}Dow`]) {
            const days = location[`schedule${i}Dow`].split(',');

            days.forEach((d) => {
              if (document.getElementById(
                      `schedule${i}DowChoices-${d.trim()}`)) {
                this.editForm.controls[`schedule${i}DowChoices`].value.push(d);
                document.getElementById(
                    `schedule${i}DowChoices-${d.trim()}`)['checked'] = true;
              }
            });
          }
        }
      }, 50);
    } else {
      this.editForm.reset();
      this.editForm.controls.isOpen.setValue(true);
    }

    setTimeout(() => {
      document.getElementById('edit-company-in').focus();
    }, 100);
  }

  discardStoreChanges() {
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

                  if (result.resultCode === 200) {
                    this.editing = false;
                    this.notification.success(this.translate(
                        'messages.success.location_successfully_updated'));

                    this.getLocations();
                  } else {
                    let errorMessage = '';
                    switch (result.resultCode) {
                      case 450:
                        errorMessage = this.translate(
                            'messages.errors.unable_to_update_location_schedule');
                        break;

                      case 451:
                        errorMessage = this.translate(
                            'messages.errors.unable_to_update_location_location');
                        break;
                    }
                    this.notification.error(
                        this.translate(
                            'messages.errors.unable_to_update_location') +
                        ' ' + errorMessage);
                  }
                },
                (error) => {
                  this.loader.hide('pageLoader');

                  if (error.error) {
                    this.notification.error(`${error.error.resultMessage}`);
                  } else {
                    this.notification.error(this.translate(
                        'messages.errors.unable_to_update_location'));
                  }

                  this.logger.error('Error saving location', error.error);
                }));
  }
}
