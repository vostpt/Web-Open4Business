import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessesService } from '@businesses-feature-module/services/businesses.service';
import { BasePageComponent } from '@core-modules/main-layout';
import { ParserService } from '@core-modules/core/services/parser.service';


@Component({
  selector: 'app-businesses-locations-confirm',
  templateUrl: './locations-confirm.component.html',
  styleUrls: ['./locations-confirm.component.scss']
})
export class LocationsConfirmComponent extends BasePageComponent implements
    OnInit, AfterViewInit, OnDestroy {
  public batchId: string;

  public total: number = 0;
  public pages: number = 1;
  public page: number = 1;
  public isAdmin: boolean = false;

  contentReady = false;
  datasets = {locations: []};
  public batch: {batchId: string, status: string, personName: string, personEmail : string, personPhone: string, updatedAt: number, stats: {total: number, added: number, updated: number, ignored: number}} = null;

  constructor(
      private readonly businessesService: BusinessesService,
      private readonly parserService: ParserService,
      private route: ActivatedRoute) {
    super();

    this.isAdmin = (localStorage.getItem('token') && localStorage.getItem('email') && localStorage.getItem('isA') === 'true' ? true : false);
  }

  ngOnInit() {
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

    this.subscriptions.push(
      this.businessesService.getBatch(this.batchId)
          .subscribe(
              (result: {data: {batch: {batchId: string, status: string, personName: string, personEmail : string, personPhone: string, updatedAt: number, stats: {total: number, added: number, updated: number, ignored: number}}}}) => {
                    this.batch = result.data.batch;
              },
              (error) => {
                this.loader.hide('pageLoader');
                this.logger.error('Error fetching batch', error);
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
                            this.parserService.formatScheduleProperty(item[`schedule${i}`]);
                      }
                    }

                    return item;
                  });

                  this.total = parseInt(result.data.total);
                  this.pages = Math.ceil(this.total / 50);
                  const offset = parseInt(result.data.offset);
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
    console.log('save', confirm);
    const data = {email: this.batch.personEmail, batchId: this.batchId, confirm};

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
}
