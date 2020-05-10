import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, UrlModel } from '@core-modules/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class BusinessesService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private translateService: TranslateService) {}


  getUser() {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/info');
    return this.http.get(url.buildUrl());
  }

  confirmAccount(token, confirmationCode) {
    const url =
        new UrlModel(this.apiUrl).setPath('businesses/v1/confirm').buildUrl();
    return this.http.post(url, {token, confirmationCode});
  }

  getLocations(filter: any, limit?: number, offset?: number) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations');
    let params = filter || {};

    params = {...params, limit: limit || 999999, offset: offset || 0};

    url.setQueryParams(params);

    return this.http.get(url.buildUrl());
  }

  getBatch(batchId: string) {
    const url =
        new UrlModel(this.apiUrl).setPath('businesses/v1/locations/batch/:batchId');

    if (batchId) {
      url.setPathParams({batchId});
    }

    return this.http.get(url.buildUrl());
  }

  getBatches(status?: string) {
    const url =
        new UrlModel(this.apiUrl).setPath('businesses/v1/locations/batch');

    if (status) {
      url.setQueryParams({status});
    }

    return this.http.get(url.buildUrl());
  }

  submitBatch(batchId: string, submit: boolean) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations/batch');

    return this.http.post(url.buildUrl(), {batchId, submit});
  }

  sendNewLocationsFile(body: {
    company: string,
    name: string,
    lastName: string,
    email: string,
    phone: string,
    dataFile: string
  }) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations');

    return this.http.post(url.buildUrl(), body);
  }

  confirmLocations(body: {email: string, batchId: string, confirm: boolean}) {
    const url =
        new UrlModel(this.apiUrl).setPath('businesses/v1/locations/confirm');

    return this.http.post(url.buildUrl(), body);
  }

  setMarker(businessId: string, markerPath: string) {
    const url =
        new UrlModel(this.apiUrl).setPath('businesses/v1/business/marker');

    return this.http.post(url.buildUrl(), {businessId, markerPath});
  }

  updateLocation(location: any) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations');

    return this.http.put(url.buildUrl(), location);
  }

  deleteLocation(locationId: string) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations');

    url.setQueryParams({locationId});

    return this.http.delete(url.buildUrl());
  }

  reverseGeoCoding(latitude: number, longitude: number) {
    const url = new UrlModel('https://api.mapbox.com').setPath('/geocoding/v5/mapbox.places/:longitude,:latitude.json');

    const qParams = {
      access_token: environment.mapbox,
      types: 'country'
    };

    const pParams = {
      latitude,
      longitude
    };

    url.setQueryParams(qParams);
    url.setPathParams(pParams);

    return this.http.get(url.buildUrl());
  } 

  geoCoding(search: string) {
    const url = new UrlModel('https://api.mapbox.com').setPath('/geocoding/v5/mapbox.places/:search.json');

    const qParams = {
      access_token: environment.mapbox,
      autocomplete: true,
      language: this.translateService.currentLang || this.translateService.getDefaultLang(),
      country: environment.country,
      // type: 'address'
    };

    const pParams = {
      search
    };

    url.setQueryParams(qParams);
    url.setPathParams(pParams);

    return this.http.get(url.buildUrl());
  } 
}
