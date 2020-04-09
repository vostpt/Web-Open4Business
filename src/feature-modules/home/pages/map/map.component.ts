import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BasePageComponent, BaseLayoutComponent } from '@core-modules/main-layout';

import { MapService } from '../../services/map.service';

// import { EventModel } from '@external-modules/catalog/modules/map';

@Component({
  selector: 'app-home-map',
  templateUrl: './map.component.html'
})
export class MapComponent extends BasePageComponent implements OnInit, OnDestroy {

  public contentReady = false;

  constructor(
    private readonly mapService: MapService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    super();
  }


  ngOnInit() {
    this.logger.debug('App started!');

    // Temporary testing debug.
    this.logger.info('environment Ready', this.environment.variables.apiUrl);
    this.loader.show('app-map');
    this.draw();

  }

  draw() {

    this.contentReady = true;
    this.logger.debug('App ready!');
    this.loader.hide('app-map');
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
