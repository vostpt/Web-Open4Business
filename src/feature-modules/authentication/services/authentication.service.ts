import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class AuthenticationService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  signin(body: { authId: string, password: string }) {
    const url = new UrlModel(this.apiUrl).setPath('api/auth/v1/signin').buildUrl();
    return this.http.post(url, body);
  }

  signup(body:
    {
      email: string,
      company: string,
      name: string,
      phone: string
    }
  ) {
    const url = new UrlModel(this.apiUrl).setPath('api/insights/v1/business');

    return this.http.post(url.buildUrl(), body);
  }



}
