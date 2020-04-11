import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class HomeService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }



  sendLargeCompaniesForm(body:
    {
      company: string,
      name: string,
      lastName: string,
      email: string,
      phone: string,
    }
  ) {
    const url = new UrlModel(this.apiUrl).setPath('charts');
    
    return this.http.post(url.buildUrl(), body);
  }

}
