import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class MapService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  getBusinesses() {
    const url = new UrlModel(this.apiUrl).setPath('insights/v1/locations/businesses');

    return this.http.get(url.buildUrl());
  }

  getMarkers(search: string) {
    const url = new UrlModel(this.apiUrl).setPath('insights/v1/locations');

    if (search) {
      url.setQueryParams({search});
    }

    return this.http.get(url.buildUrl());
  }

  getDistricts() {
    const url = new UrlModel(this.apiUrl).setPath('insights/v1/locations/districts');

    return this.http.get(url.buildUrl());
  }

  getSectors() {
    const url = new UrlModel(this.apiUrl).setPath('insights/v1/locations/sectors');

    return this.http.get(url.buildUrl());
  }

  getLocations(limit: number, offset: number, filter?: {search?: string, sector?: string, district?: string}) {
    const url = new UrlModel(this.apiUrl).setPath('insights/v1/locations-list');
    let params = {};
    params = {...params, ...{limit, offset}};

    if (filter) {
      if (filter.search) {
        params = {...params, ...{limit, search: filter.search}};
      }

      if (filter.sector) {
        params = {...params, ...{limit, sector: filter.sector}};
      }

      if (filter.district) {
        params = {...params, ...{limit, district: filter.district}};
      }
    }


    url.setQueryParams(params);

    return this.http.get(url.buildUrl());
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

      if (element.obs) {
        element.obs = element.obs.length > 140 ? element.obs.substring(0, 137) + '...' : element.obs;
      }

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
