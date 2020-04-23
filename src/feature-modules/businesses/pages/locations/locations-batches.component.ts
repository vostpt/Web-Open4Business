import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ContentChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BusinessesService} from '@businesses-feature-module/services/businesses.service';
import {SelectComponent} from '@core-modules/catalog/modules/forms/components/select/select.component';
import {BasePageComponent} from '@core-modules/main-layout';


@Component({
  selector: 'app-businesses-locations-batches',
  templateUrl: './locations-batches.component.html',
  styleUrls: ['./locations-batches.component.scss']
})
export class LocationsBatchesComponent extends BasePageComponent implements
    OnInit, AfterViewInit, OnDestroy {

  public statusList = [
    {id: 'WAITING_FOR_APPROVAL', desc: 'À Espera de Aprovação'},
    {id: 'APPROVED', desc: 'Aprovadas'},
    {id: 'REJECTED', desc: 'Rejeitadas'},
    {id: 'DISCARDED', desc: 'Descartadas'},
  ];

  public statusListDesc = [];

  public status: string = null;

  form: FormGroup;
  get f() {
    return this.form.controls;
  }

  contentReady = false;
  datasets = {batches: []};

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly businessesService: BusinessesService) {
    super();

    this.statusList.forEach((s) => {
      this.statusListDesc[s.id] = s.desc;
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({status: [null, null]});

    this.form.get('status').valueChanges.subscribe(val => {
      this.status = val;

      this.getBatches();
    });
    

    this.getBatches();
  }

  ngAfterViewInit() {}

  getBatches() {
    this.loader.show('pageLoader');

    this.subscriptions.push(
        this.businessesService.getBatches(this.status)
            .subscribe(
                (result: {data: {batches: object[]}}) => {
                  this.datasets.batches = result.data.batches;

                  this.contentReady = true;
                  this.loader.hide('pageLoader');
                  document.getElementById('kt_scrolltop').click();
                },
                (error) => {
                  this.loader.hide('pageLoader');
                  this.logger.error('Error fetching batches', error);
                }));
  }
}