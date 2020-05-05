import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class UsersService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(limit: number, offset: number, search?: string, status?: string) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/users');
    let filter = {};
    filter = { ...filter, ...{ limit, offset } };
    if (search) {
      filter = { ...filter, search };
    }

    if (status) {
      filter = { ...filter, status };
    }

    url.setQueryParams(filter);

    return this.http.get(url.buildUrl());
  }

  getUser(authId?: string) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/info');

    if (authId) {
      url.setQueryParams({ authId });
    }

    return this.http.get(url.buildUrl());
  }

  saveUserInfo(body:
    {
      authId?: string,
      company: string,
      name: string,
      email: string,
      phone: string
    }) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/info');
    return this.http.put(url.buildUrl(), body);
  }

  saveUserPassword(body:
    {
      currentPassword?: string,
      password: string
    }) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/password');
    return this.http.put(url.buildUrl(), body);
  }

  deactivateUser(email: string) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/deactivate');
    return this.http.post(url.buildUrl(), { email });
  }

  deleteUser(email: string) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/delete');
    return this.http.post(url.buildUrl(), { email });
  }

  confirmAccount(token, confirmationCode) {
    const url =
      new UrlModel(this.apiUrl).setPath('businesses/v1/confirm').buildUrl();
    return this.http.post(url, { token, confirmationCode });
  }
}
