import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParserService } from '@core-modules/core/services/parser.service';
import { BasePageComponent } from '@core-modules/main-layout';
import { MapService } from '@home-feature-module/services/map.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BasePageComponent implements OnInit, AfterViewInit, OnDestroy {

  public total = 0;
  public pages = 1;
  public page = 1;
  public sectorList = [];
  public districtList = [];

  public sector = null;
  public district = null;

  contentReady = false;
  datasets = {
    locations: [],
  };

  form: FormGroup;
  get f() { return this.form.controls; }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly parserService: ParserService,
    private readonly mapService: MapService) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      search: [null, null],
      sector: [null, null],
      district: [null, null],
    });

    this.form.get('sector').valueChanges.subscribe(val => {
      this.sector = val;

      this.onSearch();
    });

    this.form.get('district').valueChanges.subscribe(val => {
      this.district = val;

      this.onSearch();
    });

    this.getSectors();
    this.getDistricts();
    this.getLocations();
  }

  ngAfterViewInit() { }

  private compareValues(a, b) {
    const descA = a.desc.toUpperCase();
    const descB = b.desc.toUpperCase();

    let comparison = 0;
    if (descA > descB) {
      comparison = 1;
    } else if (descA < descB) {
      comparison = -1;
    }
    return comparison;
  }

  getDistricts() {
    this.subscriptions.push(this.mapService.getDistricts().subscribe(
      result => {
        if (!result['data']) {
          return;
        }

        const resultData = result['data'];

        if (resultData.districts) {
          this.districtList = resultData.districts.map((d) => {
            return { desc: `${d.district} (${d.count})`, id: d.district };
          });

          this.districtList = this.districtList.sort(this.compareValues);
        }
      },
      (error) => {
        this.logger.error('Error fetching districts', error);
      }));
  }

  getSectors() {
    this.subscriptions.push(this.mapService.getSectors().subscribe(
      result => {
        if (!result['data']) {
          return;
        }

        const resultData = result['data'];

        if (resultData.sectors) {
          this.sectorList = resultData.sectors.map((s) => {
            return { desc: `${s.sector} (${s.count})`, id: s.sector };
          });
          this.sectorList = this.sectorList.sort(this.compareValues);
        }
      },
      (error) => {
        this.logger.error('Error fetching sectors', error);
      }));
  }

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
      filter = { ...filter, search };
    }

    if (this.sector) {
      filter = {
        ...filter,
        ...{
          sector: this.sector
        }
      };
    }

    if (this.district) {
      filter = {
        ...filter,
        ...{
          district: this.district
        }
      };
    }

    this.subscriptions.push(
      this.mapService.getLocations(50, (this.page - 1) * 50, filter)
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

            this.total = parseInt(resultData['data'].total, 10);
            this.pages = Math.ceil(this.total / 50);
            const offset = parseInt(resultData['data'].offset, 10);
            this.page = offset > 0 ? Math.round(offset / 50) + 1 : 1;
            this.contentReady = true;

            if (this.districtList.length === 0 &&
              resultData['data'].districts) {
              this.districtList =
                resultData['data'].districts.map((d) => {
                  return {
                    desc: `${d.district} (${d.count})`,
                    id: d.district
                  };
                });
            }

            this.loader.hide('pageLoader');
          },
          (error) => {
            this.loader.hide('pageLoader');
            this.logger.error('Error fetching map markers', error);
          }));
  }

  onSearch() {
    this.loader.show('pageLoader');
    this.page = 1;
    this.getLocations();
  }
}
