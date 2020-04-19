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

  getLocations() {
    const url = new UrlModel(this.apiUrl).setPath('businesses/v1/locations').buildUrl();
    return this.http.get(url);
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


}
