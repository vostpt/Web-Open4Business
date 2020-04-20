import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FormsService} from '@core-modules/catalog/modules/forms';
import {BasePageComponent} from '@core-modules/main-layout';
import {MapboxMarkerProperties} from '@home-feature-module/models/mapbox-marker-properties.model';
import {MapService} from '@home-feature-module/services/map.service';
import {LngLat, Map, Popup} from 'mapbox-gl';

@Component({
  selector: 'app-home-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends BasePageComponent implements OnInit,
                                                               OnDestroy {
  public showCookieWarning =
      (JSON.parse(localStorage.getItem('dismissedCookieWarning')) ? false :
                                                                    true);
  public showInformationBanner =
      (JSON.parse(localStorage.getItem('dismissedInformationBanner')) ? false :
                                                                        true);
  public searchPlaceholder = 'Pesquise locais';

  private map: Map;

  form: FormGroup;
  get f() {
    return this.form.controls;
  }

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly formsService: FormsService,
      private readonly mapService: MapService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.loader.show('app-map');

    this.form = this.formBuilder.group({search: [null, null]});


    this.route.queryParams.subscribe(params => {
      const search = params['search'];
      if (search) {
        this.form.setValue({search});
      }

      let markers: GeoJSON.FeatureCollection;

      this.subscriptions.push(this.mapService.getMarkers(search).subscribe(
          (result: {data: {locations: object[]}}) => {
            markers =
                this.mapService.parseResponseToGeoJSON(result.data.locations);
            this.loadMapbox(markers);
          },
          (error) => {
            this.loader.hide('app-map');
            this.logger.error('Error fetching map markers', error);
          }));

      this.draw();
    });
  }

  search() {
    this.loader.show('app-map');

    try {
      document.getElementsByClassName('mapboxgl-popup-close-button')[0]['click']();  
    } catch (error) {
      
    }
    

    const search = this.form.get('search').value;
    let markers: GeoJSON.FeatureCollection;

    this.subscriptions.push(this.mapService.getMarkers(search).subscribe(
        (result: {data: {locations: object[]}}) => {
          try {
            markers =
                this.mapService.parseResponseToGeoJSON(result.data.locations);
            this.map.getSource('businesses')['setData'](markers);

            if (result.data.locations.length > 0) {
              const point = new LngLat(
                  markers.features[0].geometry['coordinates'][0],
                  markers.features[0].geometry['coordinates'][1]);
              this.map.panTo(point);
            }
          } catch (error) {
            console.error(error);
          }

          this.loader.hide('app-map');
        },
        (error) => {
          this.loader.hide('app-map');
          this.logger.error('Error fetching map markers', error);
        }));
  }

  loadMapbox(markers: GeoJSON.FeatureCollection) {
    this.map = new Map({
      accessToken: this.environment.variables.mapbox,
      container: 'map-container',
      style: 'mapbox://styles/vostpt/ck94io81o3y4k1iqpfzjvz0vu',
      center: [-7.8536599, 39.557191],  // [lng, lat]
      zoom: 7
    });

    // Load markers image
    this.map.loadImage('assets/images/mapbox/pin.png', (error, image) => {
      if (error) {
        throw error;
      }
      this.map.addImage('pin', image);
    });


    this.map.on('load', () => {
      this.map.addSource('businesses', {
        type: 'geojson',
        data: markers,
        cluster: true,
        clusterMaxZoom: 14,  // Max zoom to cluster points on
        clusterRadius: 50    // Radius of each cluster when clustering points
        // (defaults to 50)
      });

      this.map.addLayer({
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
          // 51bbd6
          'circle-color': [
            'step', ['get', 'point_count'], '#4eaa4f', 100, '#f1f075', 750,
            '#f28cb1'
          ],
          'circle-radius':
              ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
        }
      });

      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'businesses',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
        paint: {'text-color': '#ffffff'}
      });

      this.map.addLayer({
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

      // this.map.addLayer({
      //   id: 'poi-labels',
      //   type: 'symbol',
      //   source: 'businesses',
      //   layout: {
      //     'text-field': ['get', 'store'],
      //     'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      //     'text-radial-offset': 2,
      //     'text-justify': 'center',
      //     'text-size': 12
      //   }
      // });

      // Events.
      this.map.on('mouseenter', 'clusters', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'clusters', () => {
        this.map.getCanvas().style.cursor = '';
      });

      this.map.on('mouseenter', 'unclustered-point', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'unclustered-point', () => {
        this.map.getCanvas().style.cursor = '';
      });

      this.map.on('wheel', event => {
        if (event.originalEvent.ctrlKey) {
          return;
        }

        if (event.originalEvent.metaKey) {
          return;
        }

        if (event.originalEvent.altKey) {
          return;
        }

        event.preventDefault();
      });

      this.map.on('click', 'unclustered-point', (e) => {
        const element = new MapboxMarkerProperties(e.features[0].properties);
        const coordinates = e.lngLat;

        this.map.flyTo({center: coordinates, offset: [0, 225]});

        new Popup({offset: 25})
            .setLngLat(coordinates)
            .setHTML(this.getPopupHTML(element, coordinates))
            .addTo(this.map);
      });

      let that = this;
      this.map.on('click', 'clusters', function(e) {
        const cluster =
            that.map.queryRenderedFeatures(e.point, {layers: ['clusters']});
        console.log(cluster);
        const coordinates = cluster[0].geometry['coordinates'];
        const currentZoom = that.map.getZoom();

        that.flyIntoCluster(coordinates, currentZoom);
      });

      this.map.resize();
    });
  }

  flyIntoCluster(coordinates, currentZoom) {
    console.log('currentZoom', currentZoom);
    /*
    in my case, I don't care about currentZoom instead I just hardcode max zoom
    which I know will reveal all the icons since the user can only zoom in this
    close but you may want to use currentZoom
    */
    const maxZoom = currentZoom + 3;

    this.map.flyTo({
      // These options control the ending camera position: centered at
      // the target, at zoom level 16, and north up.
      center: coordinates,
      zoom: maxZoom,
      bearing: 0,

      // These options control the flight curve, making it move
      // slowly and zoom out almost completely before starting
      // to pan.
      speed: 2,  // make the flying slow
      curve: 1,  // change the speed at which it zooms out

      // This can be any easing function: it takes a number between
      // 0 and 1 and returns another number between 0 and 1.
      easing: function(t) {
        return t;
      }
    });
  }

  draw() {
    this.logger.debug('App ready!');
    this.loader.hide('app-map');
  }

  getPopupHTML(properties: MapboxMarkerProperties, coordinates) {
    let html = `
      <h4>${properties.store}</h4>
      <p class="small">${properties.sector},&nbsp;${properties.parish}</p>
      <p>Telf.: ${properties.phone}</p>
      <p>${properties.address}</p>
      <p>${properties.zipCode} ${properties.parish}</p>
      <br />`;

    html +=
        (properties.schedule1Dow || properties.schedule2Dow ||
                 properties.schedule3Dow ?
             `<h5><b>Horário de Funcionamento</b></h5>` :
             '');

    for (let i = 1; i <= 3; i++) {
      const dayOfWeekPeriods =
          this.formatWeekdaysListProperty(properties[`schedule${i}Dow`]);
      const schedule = this.formatScheduleProperty(properties[`schedule${i}`]);

      if (dayOfWeekPeriods) {
        html += `<span>${properties[`schedule${i}Type`] || ''}`;
        
        if (properties[`schedule${i}Period`]) {
          html += `:&nbsp;<span class="font-italic">${properties[`schedule${i}Period`]}</span>`;
        }
        
        html += `</span>`;
      }

      html +=
          (dayOfWeekPeriods ? `
          <div class="row">
            <div class="col-5"><p>${dayOfWeekPeriods}:</p></div>
            <div class="col-7"><p>${schedule}</p></div>
          </div>` : '');
    }

    html +=
        (properties.typeOfService ? `<br /><h5><b>Entregas</b></h5><p>${
                                        properties.typeOfService}</p>` :
                                    '');

    if (properties.byAppointment == 'Sim') {
      html += `<br /><h5><b>Por Marcação</b></h5>`;
      html += `<p>${properties.contactForSchedule || ''}<p>`;
    }

    html +=
        (properties.obs ? `<br /><p class="notes">${properties.obs}</p>` : '');

    html += `<br /><div class="row"><div class="col-12 text-center"><a href="https://www.google.pt/maps/search/${
        coordinates.lat},${
        coordinates
            .lng}" target="_blank" class="btn btn-primary link">Navegar para...</a></div></div>`;


    // tipo de horário,
    // Por Marcação(if Sim)
    // Contacto Agendamento(if Marcação = Sim)

    return html;
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

  onFormSubmit() {
    this.loader.show('app-map');

    if (this.form.valid) {
      this.search();
    } else {
      this.loader.hide('app-map');
      this.formsService.showErrors(this.form);
    }
  }
}
