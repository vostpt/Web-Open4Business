import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../models/environment.model';
import { UrlModel } from '../models/url.model';

@Injectable()
export class AuthenticationService {

  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  verifySession() {
    const url = new UrlModel(this.url).setPath('api/auth/v1/session').buildUrl();
    return this.http.get(url);
  }

}
