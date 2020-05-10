import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessesService } from '@businesses-feature-module/services/businesses.service';
import { BasePageComponent } from '@core-modules/main-layout';
import { LngLat, Map, Marker } from 'mapbox-gl';


@Component({
  selector: 'app-businesses-modals-choose-coordinates-from-map-modal',
  templateUrl: './choose-coordinates-from-map-modal.component.html',
  styleUrls: ['./choose-coordinates-from-map-modal.component.scss']
})
export class ChooseCoordinatesFromMapModalComponent extends BasePageComponent
    implements OnInit, AfterViewInit {
  private map: Map;
  private coordinates: {lat: number, lng: number};
  public searchText: string;
  public searchResults:
      [{label?: string, longitude?: number, latitude?: number}?];
  public searchTimeout;
  public marker: Marker;
  public showResults = false;

  form: FormGroup;
  get f() {
    return this.form.controls;
  }

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: {lat: number, lng: number},
      public dialogRef: MatDialogRef<ChooseCoordinatesFromMapModalComponent>,
      private readonly formBuilder: FormBuilder,
      private businessService: BusinessesService) {
    super();
  }


  ngOnInit() {
    this.form = this.formBuilder.group({search: [null, null]});

    this.form.get('search').valueChanges.subscribe(val => {
      this.searchText = val;

      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {this.search()}, 250);
    });

    this.coordinates =
        this.data ? this.data : new LngLat(-7.8536599, 39.557191);

    // create DOM element for the marker.
    const el = document.createElement('div');
    el.id = 'marker';

    this.marker = new Marker(el);
    this.marker.setDraggable(true).setLngLat(this.coordinates);

    this.marker.on('dragend', () => {
      const lngLat = this.marker.getLngLat();
      this.coordinates = lngLat;
    });
  }

  ngAfterViewInit() {
    this.map = new Map({
      accessToken: this.environment.variables.mapbox,
      container: 'map-container',
      style: 'mapbox://styles/vostpt/ck94io81o3y4k1iqpfzjvz0vu',
      center: this.coordinates,  // [lng, lat]
      zoom: this.data ? 16 : 7
    });

    this.marker.addTo(this.map);
    this.map.flyTo({center: this.coordinates});

    this.map.on('click', (e) => {
      this.coordinates = e.lngLat;

      this.marker.setLngLat(e.lngLat);
    });
  }

  search() {
    this.subscriptions.push(
        this.businessService.geoCoding(this.searchText)
            .subscribe((response: {
                         features: [{place_name: string, center: number[]}]
                       }) => {
              this.searchResults = [];

              response.features.forEach(f => {
                console.log(f);
                this.searchResults.push({
                  label: f.place_name,
                  longitude: f.center[0],
                  latitude: f.center[1]
                });
              });

              this.showResults = this.searchResults.length > 0;
            }));
  }

  setMarker(point) {
    this.showResults = false;
    this.coordinates = new LngLat(point.longitude, point.latitude);
    this.marker.setLngLat(this.coordinates);

    this.map.flyTo({center: this.coordinates, zoom: 16});
  }

  onSave() {
    this.dialogRef.close(this.coordinates);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
