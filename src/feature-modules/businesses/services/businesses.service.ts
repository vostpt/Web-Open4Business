import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class BusinessesService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  confirmAccount(token, confirmationCode) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/confirm').buildUrl();
    return this.http.post(url, {token, confirmationCode});
  }

  getLocations(search) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations');

    if (search) {
      url.setQueryParams({search});
    }

    return this.http.get(url.buildUrl());
  }

  sendNewLocationsFile(body:
    {
      company: string,
      name: string,
      lastName: string,
      email: string,
      phone: string,
      dataFile: string
    }
  ) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations');

    return this.http.post(url.buildUrl(), body);
  }
  
  confirmLocations(body:
    {
      email: string,
      batchId: string,
      confirm: boolean
    }
  ) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations/confirm');

    return this.http.post(url.buildUrl(), body);
  }
  
  updateLocation(location:any) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations');

    return this.http.put(url.buildUrl(), location);
  }

  deleteLocation(locationId: string) {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations');

    url.setQueryParams({locationId});

    return this.http.delete(url.buildUrl());
  }

}
