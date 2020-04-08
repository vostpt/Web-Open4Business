import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BasePageComponent, BaseLayoutComponent } from '@external-modules/main-layout';

import { MapService } from './services/map.service';

import { EventModel } from '@external-modules/catalog/modules/map';

@Component({
  selector: 'app-home-map',
  templateUrl: './map.component.html'
})
export class MapComponent extends BasePageComponent implements OnInit, OnDestroy {
  public datasets: {
    systems: {
      id: string,
      name: string,
      gpsLatitude?: number,
      gpsLongitude?: number,
      externalInfo?: {}
    }[]
  };
  public systemMarkers: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
    title: string;
    id: string;
  }[];
  public contentReady = false;

  constructor(
    private readonly mapService: MapService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    super();
  }

  getSystemsList() {
    return this.mapService.getSystemsList();
  }
  onSystemsListLoaded(result) {
    this.datasets.systems = result.data.systems;
    this.formatMarkersSystems(result.data.systems);
  }

  ngOnInit() {
    this.logger.debug('App started!');

    // Temporary testing debug.
    this.logger.info('environment Ready', this.environment.variables.apiUrl);
    this.logger.info('environment Configurations Ready', this.environment.getConfiguration('userRegisterMethod'));

    this.loader.show('app-map');
    this.datasets = {
      systems: []
    };

    this.subscriptions.push(
      this.getSystemsList().subscribe(
        res => {
          this.onSystemsListLoaded(res);
          this.draw();
        },
        () => {
          this.loader.hide('app-map');
        }
      )
    );
  }

  draw() {
    if (this.route.snapshot.queryParams.system) {
      const systemFound = this.datasets.systems.find(s => s.id === this.route.snapshot.queryParams.system);
      if (systemFound) {
        this.systemMarkers = [{
          coordinates: {
            latitude: systemFound.gpsLatitude,
            longitude: systemFound.gpsLongitude
          },
          title: systemFound.name,
          id: systemFound.id
        }];
      }
    } else {
      this.formatMarkersSystems(this.datasets.systems);
    }

    this.contentReady = true;
    this.loader.hide('app-map');
  }

  formatMarkersSystems(systems) {
    this.systemMarkers = systems.map(s => {
      {
        return {
          coordinates: {
            latitude: s.gpsLatitude,
            longitude: s.gpsLongitude
          },
          title: s.name,
          id: s.id,
          draggable: false
        };
      }
    }).filter(s => s !== undefined);
  }

  onMapEvent(event: EventModel) {
    if (event.type === 'markerClicked') {
      this.router.navigateByUrl(`/energy?system=${event.data.marker}`);
    }
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
