import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BasePageComponent, BaseLayoutComponent } from '@core-modules/main-layout';

import { MapService } from '../../services/map.service';

import { Map, Marker, Popup, GeoJSONSourceOptions, GeoJSONSource, GeoJSONSourceRaw, Point } from 'mapbox-gl';
import *  as mapboxgl from 'mapbox-gl';



// import { EventModel } from '@external-modules/catalog/modules/map';

@Component({
  selector: 'app-home-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends BasePageComponent implements OnInit, OnDestroy {

  public contentReady = false;

  map: mapboxgl.Map;

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



    const map = new Map({
      //const map = new mapboxgl.Map({
      accessToken: this.environment.variables.mapbox,
      container: 'map-container',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-7.8536599, 39.557191], // [lng, lat]
      zoom: 7
    });




    const markers = this.mapService.getMarkers();
    console.log(markers);

    var geojsonvar: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.032, 38.913]
          },
          properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776]
          },
          properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
          }
        }]

    };



    map.loadImage(
      'assets/images/mapbox/pin.png',
      function(error, image) {
          if (error) throw error;
          map.addImage('pin', image);
      }
  );

    map.on('load', function () {

      map.addSource('businesses', {
        type: 'geojson',
        //data: geojsonvar,
        data: markers,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });


      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'businesses',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
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
            'icon-image': "pin",
            'icon-size': 0.8,
            'icon-allow-overlap': true,
        }
        // paint: {
        //     'circle-color': '#11b4da',
        //     'circle-radius': 4,
        //     'circle-stroke-width': 1,
        //     'circle-stroke-color': '#fff'
        // }
    });



    // map.on('click', 'clusters', function(e) {
    //     var features = map.queryRenderedFeatures(e.point, {
    //         layers: ['clusters']
    //     });
    //     var clusterId = features[0].properties.cluster_id;
    //     map.getSource('businesses').getClusterExpansionZoom(
    //         clusterId,
    //         function(err, zoom) {
    //             if (err) return;
    //             map.easeTo({
    //                 center: features[0].geometry.coordinates,
    //                 zoom: zoom
    //             });
    //         }
    //     );
    // });

    map.on('mouseenter', 'clusters', function() {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function() {
        map.getCanvas().style.cursor = '';
    });


    map.on('click', 'unclustered-point', function(e)
    {
        var element = e.features[0].properties;

        console.log(e.l);
        console.log(e.features);

        /*
        element.schedules = JSON.parse(element.schedules);
        var marker_element = document.createElement('div');
        marker_element.className = 'marker';
        let schedules_html = "";
        let schedule_by_appointment_html = "";
        element.schedules.forEach(schedule => {
            let schedule_rows = "";
            let days = getDaysOpenString(schedule);
            days.forEach(day => {
                let formated_start_hour = schedule.start_hour.substring(0, schedule.start_hour.length - 3);;
                let formated_end_hour = schedule.end_hour.substring(0, schedule.end_hour.length - 3);
                let hours = formated_start_hour + " às " + formated_end_hour;
                if(schedule.by_appointment) {
                    let template_schedule_by_appointment_row = $("#template_schedule_by_appointment_row").html();
                    template_schedule_by_appointment_row = template_schedule_by_appointment_row.split("{days}").join(day);
                    template_schedule_by_appointment_row = template_schedule_by_appointment_row.split("{hours}").join(hours);
                    template_schedule_by_appointment_row = template_schedule_by_appointment_row.split("{contacts}").join(schedule.by_appointment_contacts);
                    schedule_by_appointment_html += template_schedule_by_appointment_row;
                }
                else {
                    let template_schedule_row = $("#template_schedule_row").html();
                    template_schedule_row = template_schedule_row.split("{days}").join(day);
                    template_schedule_row = template_schedule_row.split("{hours}").join(hours);
                    schedule_rows += template_schedule_row;
                }
            });
            if(schedule_rows !== "") {
                schedule_rows = "<h6>Horário de Funcionamento</h6>" + schedule_rows;
            }
            if(schedule_by_appointment_html !== "") {
                schedule_by_appointment_html = "<h6>Horários por Marcação</h6>" + schedule_by_appointment_rows;
            }
            schedules_html = $("#template_schedules").html();
            schedules_html = schedules_html.split("{type_string}").join(schedule.type_string);
            schedules_html = schedules_html.split("{schedule_rows}").join(schedule_rows);
        });
        let template_html = '<div class="container"><div class="row"><div class="col-12">';
        template_html += $("#template_marker").html();
        console.log(template_html);
        template_html = template_html.split("{store_name}").join(element.store_name);
        template_html = template_html.split("{sector_string}").join(element.sector_string);
        template_html = template_html.split("{parish}").join(element.parish);
        template_html = template_html.split("{phone_number}").join(element.phone_number);
        template_html = template_html.split("{address}").join(element.address);
        template_html = template_html.split("{postal_code}").join(element.postal_code);
        template_html = template_html.split("{schedules}").join(schedules_html);
        template_html = template_html.split("{schedules_by_appointment}").join(schedule_by_appointment_html);
        template_html += '</div></div></div>';
        console.log(template_html);
        */
        var coordinates = e.lngLat


   

        new Popup({ offset: 25 })
            .setLngLat(coordinates)
            .setHTML(`
      
            <h4>${element.store_name}</h4>
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
            </div> 
    `);
            
    });


      // map.resize();


      
    });



    //////////////////// v1
    /*
        //geojson.features.forEach(function(marker) {
        this.markers.forEach(function (marker: object) {
    
          console.log(marker);
          // make a marker for each feature and add to the map
          new Marker()
            //.setLngLat(marker.geometry.coordinates)
            .setLngLat([marker.long, marker.lat])
            .setPopup(
              new Popup({ offset: 25 })
              .setHTML(`
          
            <h4>${marker.store_name}</h4>
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
            </div> 
    `))
            .addTo(map);
        });
    
    
    
    */



    // map.getSource('some id').setData({
    //   "type": "FeatureCollection",
    //   "features": [{
    //       "type": "Feature",
    //       "properties": { "name": "Null Island" },
    //       "geometry": {
    //           "type": "Point",
    //           "coordinates": [
    //             -76.53063297271729,
    //             39.18174077994108
    //         ]
    //       }
    //   }]
    // });




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

