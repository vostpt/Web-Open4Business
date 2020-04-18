import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class MapService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  getMarkers() {
    const url = new UrlModel(this.apiUrl).setPath('api/insights/v1/locations').buildUrl();
    return this.http.get(url);
  }

  parseResponseToGeoJSON(items) {

    const geoJSON: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    };

    items.forEach(element => {

      // item.icon = {
      //   iconUrl: 'https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png',
      //   iconSize: [50, 50], // size of the icon
      //   iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
      //   popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
      //   className: 'dot'
      // };


      const item: GeoJSON.Feature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [element.longitude, element.latitude]
        },
        properties: element
      };


      geoJSON.features.push(item);
    });

    return geoJSON;

  }

}
