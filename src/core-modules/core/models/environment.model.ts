import { NgxLoggerLevel } from 'ngx-logger';

if (!window['__env']) {
  window['__env'] = {};
}

export class EnvironmentModel {
  baseHref: string;
  logLevel: NgxLoggerLevel;
  defaultLanguage: string;
  apiUrl: string;
  mapbox: string;
  googleAnalytics: string;
}

export const environment: EnvironmentModel = {
  baseHref: window['__env'].baseHref,
  logLevel: NgxLoggerLevel[String((window['__env'].logLevel) || 'ERROR')],
  defaultLanguage: window['__env'].defaultLanguage || 'pt',
  apiUrl: window['__env'].apiUrl,
  mapbox: window['__env'].mapbox,
  googleAnalytics: window['__env'].googleAnalytics
};
