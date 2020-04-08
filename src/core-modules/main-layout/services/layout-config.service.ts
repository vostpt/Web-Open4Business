import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { merge } from 'lodash';
import { get } from 'object-path';

import { LayoutConfigModel } from '../_config/layout-config.model';

@Injectable()
export class LayoutConfigService {

  layoutConfig: LayoutConfigModel;

  onConfigUpdated$: Subject<LayoutConfigModel>;

  constructor() {
    this.onConfigUpdated$ = new Subject();  // register on config changed event and set default config
  }

  /**
   * Initialize layout config
   * @param config: config
   */
  loadConfiguration(config: LayoutConfigModel) {
    this.layoutConfig = config;
  }

  /**
   * Get all config or by object path
   * @param path | object path separated by dot
   */
  getConfig(path?: string): LayoutConfigModel | any {
    if (path) {
      return get(this.layoutConfig, path);  // if path is specified, get the value within object
    }

    return this.layoutConfig;
  }

  /**
   * Set existing config with a new value
   * @param value: value
   * @param save: save
   */
  setConfig(value: any, save?: boolean): void {
    this.layoutConfig = merge(this.layoutConfig, value);
    this.onConfigUpdated$.next(this.layoutConfig);  // fire off an event that all subscribers will listen
  }


  /**
   * Get brand logo
   */
  getLogo(): string {
    const menuAsideLeftSkin = get(this.layoutConfig, 'brand.self.skin');
    // set brand logo
    const logoObject = get(this.layoutConfig, 'self.logo');

    let logo;
    if (typeof logoObject === 'string') {
      logo = logoObject;
    }
    if (typeof logoObject === 'object') {
      logo = get(logoObject, menuAsideLeftSkin + '');
    }
    if (typeof logo === 'undefined') {
      try {
        const logos = get(this.layoutConfig, 'self.logo');
        logo = logos[Object.keys(logos)[0]];
      } catch (e) {
      }
    }
    return logo;
  }

  /**
   * Returns sticky logo
   */
  getStickyLogo(): string {
    let logo = get(this.layoutConfig, 'self.logo.sticky');
    if (typeof logo === 'undefined') {
      logo = this.getLogo();
    }
    return logo + '';
  }

}
