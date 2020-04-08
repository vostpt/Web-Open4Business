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

  verifyToken() {
    const url = new UrlModel(this.url).setPath('auth/v1/verify-token').buildUrl();
    return this.http.get(url);
  }

}
