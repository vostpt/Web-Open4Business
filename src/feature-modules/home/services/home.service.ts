import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {

  // public energyMenus: {
  //   id: string;
  //   name: string;
  //   url: string;
  //   icon: string;
  // }[];

  constructor() { }

  getMenus() {
    return [
      {
        id: 'dashboards',
        name: 'Dashboards',
        url: 'dashboards',
        icon: 'fas fa-eye'
      },
      {
        id: 'charts',
        name: 'Charts',
        url: 'charts',
        icon: 'fas fa-signal'
      },
      {
        id: 'devices',
        name: 'Devices',
        url: 'devices',
        icon: 'far fa-list-alt'
      },
      {
        id: 'device-properties',
        name: 'Device properties',
        url: 'device-properties',
        icon: 'flaticon-dashboard'
      }
    ];
  }
}
