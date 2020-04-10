import { NgxLoggerLevel } from 'ngx-logger';

if (!window['__env']) {
  window['__env'] = {};
}

export class EnvironmentModel {
  baseHref: string;
  logLevel: NgxLoggerLevel;
  apiUrl: string;
  mapbox: string;
}

export const environment: EnvironmentModel = {
  baseHref: window['__env'].baseHref,
  logLevel: NgxLoggerLevel[String((window['__env'].logLevel) || 'ERROR')],
  apiUrl: window['__env'].apiUrl,
  mapbox: window['__env'].mapbox
};
