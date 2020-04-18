import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class UsersService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(search?: string) {
    let url = new UrlModel(this.apiUrl).setPath('api/auth/v1/users');

    if(search) {
      url.setQueryParams({search: search})
    }

    return this.http.get(url.buildUrl());
  }

}
