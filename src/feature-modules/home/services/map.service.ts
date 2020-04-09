import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class MapService {
  private resourcesApiUrl = `${environment.apiUrl}/resource-management/v1/`;

  constructor(
    private http: HttpClient
  ) { }

  getSystemsList(queryParams?: object) {
    const url = new UrlModel(this.resourcesApiUrl).setPath('systems');
    if (queryParams) {
      url.setQueryParams(queryParams);
    }

    return this.http.get(url.buildUrl());
  }

}
