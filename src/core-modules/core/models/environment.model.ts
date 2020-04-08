import { NgxLoggerLevel } from 'ngx-logger';

if (!window['__env']) {
  window['__env'] = {};
}

export class EnvironmentModel {
  baseHref: string;
  apiUrl: string;
  logLevel: NgxLoggerLevel;
}

export const environment: EnvironmentModel = {
  baseHref: window['__env'].baseHref,
  apiUrl: window['__env'].apiUrl,
  logLevel: NgxLoggerLevel[String((window['__env'].logLevel) || 'ERROR')]
};
