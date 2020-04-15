import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class BusinessesService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }



  sendNewLocationsFile(body:
    {
      company: string,
      name: string,
      lastName: string,
      email: string,
      phone: string,
    }
  ) {
    const url = new UrlModel(this.apiUrl).setPath('/insights/v1/business');

    return this.http.post(url.buildUrl(), body);
  }

}

// POST ('/buzinesses/v1/locations') ->
// GET ('/buzinesses/v1/locations') -> listagem de
//  POST    /buzinesses/v1//file
// POST buzinesses/v1/logo
