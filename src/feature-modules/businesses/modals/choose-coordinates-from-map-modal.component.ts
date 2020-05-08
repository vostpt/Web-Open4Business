import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeolocateControl, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';

import { BasePageComponent } from '@core-modules/main-layout';


@Component({
  selector: 'app-businesses-modals-choose-coordinates-from-map-modal',
  templateUrl: './choose-coordinates-from-map-modal.component.html',
  styleUrls: ['./choose-coordinates-from-map-modal.component.scss']
})
export class ChooseCoordinatesFromMapModalComponent extends BasePageComponent implements OnInit, AfterViewInit {

  private map: Map;
  private coordinates: { lat: number, lng: number };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { lat: number, lng: number },
    public dialogRef: MatDialogRef<ChooseCoordinatesFromMapModalComponent>
  ) {
    super();
  }


  ngOnInit() {

    this.coordinates = this.data ? this.data : null;

  }


  ngAfterViewInit() {

    this.map = new Map({
      accessToken: this.environment.variables.mapbox,
      container: 'map-container',
      style: 'mapbox://styles/vostpt/ck94io81o3y4k1iqpfzjvz0vu',
      center: [-7.8536599, 39.557191],  // [lng, lat]
      zoom: 7
    });

    // create DOM element for the marker.
    const el = document.createElement('div');
    el.id = 'marker';


    if (this.coordinates) {
      const marker = new Marker(el)
        .setLngLat(this.coordinates)
        .setDraggable(true)
        .addTo(this.map);
      marker.on('dragend', () => {
        this.coordinates = marker.getLngLat();
      });
      this.map.flyTo({ center: this.coordinates });
    }


    this.map.on('click', (e) => {

      this.coordinates = e.lngLat;

      const marker = new Marker(el)
        .setLngLat(e.lngLat)
        .setDraggable(true)
        .addTo(this.map);

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        this.coordinates = lngLat;
      });

    });

  }

  onSave() {
    this.dialogRef.close(this.coordinates);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
