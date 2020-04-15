import { Component, OnDestroy, OnInit } from '@angular/core';
import { Map, Popup } from 'mapbox-gl';

import { BasePageComponent } from '@core-modules/main-layout';

import { MapService } from '@home-feature-module/services/map.service';

import { MapboxMarkerProperties } from '@home-feature-module/models/mapbox-marker-properties.model';

@Component({
  selector: 'app-home-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends BasePageComponent implements OnInit, OnDestroy {

  public showCookieWarning = (JSON.parse(localStorage.getItem('dismissedCookieWarning')) ? false : true);
  public showInformationBanner = (JSON.parse(localStorage.getItem('dismissedInformationBanner')) ? false : true);

  constructor(
    private readonly mapService: MapService
  ) {
    super();
  }

  ngOnInit() {
    this.loader.show('app-map');

    let markers: GeoJSON.FeatureCollection;

    this.subscriptions.push(this.mapService.getMarkers().subscribe(
      (result: { data: { locations: object[] } }) => {
        markers =
          this.mapService.parseResponsoToGeoJSON(result.data.locations);
        this.loadMapbox(markers);
      },
      (error) => {
        this.loader.hide('energy-dashboard');
        this.logger.error('Error fetching map markers', error);
        // TODO: remove this after tests!
        markers = this.mapService.getMarkersMockup();
        this.loadMapbox(markers);
      }));

    this.draw();

    document.getElementById('kt_quick_panel_close_btn').click();
  }

  loadMapbox(markers: GeoJSON.FeatureCollection) {
    const map = new Map({
      accessToken: this.environment.variables.mapbox,
      container: 'map-container',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-7.8536599, 39.557191],  // [lng, lat]
      zoom: 7
    });

    // Load markers image
    map.loadImage('assets/images/mapbox/pin.png', (error, image) => {
      if (error) {
        throw error;
      }
      map.addImage('pin', image);
    });


    map.on('load', () => {
      map.addSource('businesses', {
        type: 'geojson',
        data: markers,
        cluster: true,
        clusterMaxZoom: 14,  // Max zoom to cluster points on
        clusterRadius: 50    // Radius of each cluster when clustering points
        // (defaults to 50)
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'businesses',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions
          // (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          // Blue, 20px circles when point count is less than 100
          // Yellow, 30px circles when point count is between 100 and 750
          // Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750,
            '#f28cb1'
          ],
          'circle-radius':
            ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
        }
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'businesses',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'businesses',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': 'pin',
          'icon-size': 0.8,
          'icon-allow-overlap': true,
        }
      });

      // Events.
      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('click', 'unclustered-point', (e) => {
        const element = new MapboxMarkerProperties(e.features[0].properties);
        const coordinates = e.lngLat;

        new Popup({ offset: 25 })
          .setLngLat(coordinates)
          .setHTML(`
            <h4>${element.store}</h4>
            <p class="small">Minimercados, supermercados, hipermercados, </p>
            <p>Telf.: </p>
            <p>Rua Dr. José Sampaio</p>
            <p>4810-275  </p>
            <br>
            <p><b>Público Geral</b></p>
            <h6>Horário de Funcionamento</h6>
            <div class="row">
                <div class="col-5">
                    <p>Ter. a Ter.:</p>
                </div>
                <div class="col-7">
                    <p>09:00 às 18:00</p>
                </div>
            </div> `).addTo(map);
      });

      map.resize();
    });
  }

  draw() {
    this.logger.debug('App ready!');
    this.loader.hide('app-map');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  dismissCookieWarn() {
    this.showCookieWarning = false;
    localStorage.setItem('dismissedCookieWarning', 'true');
  }

  dismissInformationBanner() {
    this.showInformationBanner = false;
    localStorage.setItem('dismissedInformationBanner', 'true');
  }
}
