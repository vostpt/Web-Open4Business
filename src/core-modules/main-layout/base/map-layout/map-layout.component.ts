import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { get } from 'lodash';

import { LayoutConfigService } from '../../services/layout-config.service';
import { HtmlClassService } from '../../services/html-class.service';


@Component({
  selector: 'app-map-layout',
  templateUrl: './map-layout.component.html',
  styleUrls: ['./map-layout.component.scss']
})
export class MapLayoutComponent implements OnInit, OnDestroy {

  selfLayout: string;
  asideDisplay: boolean;
  asideSecondary: boolean;
  subheaderDisplay: boolean;
  fluid: boolean;

  private subscriptions: Subscription[] = [];

  // public datasets: {
  //   applications: { id: string, name: string }[],
  //   systems: { id: string, name: string }[],
  //   zones: { id: string, name: string }[]
  // };
  // public entity: { id: string, name: string };
  // public systemSelectForm: FormGroup;
  // public zonesForm: FormGroup;

  // public selectedMenu: string;
  public contentReady: boolean;

  constructor(
    private readonly htmlClassService: HtmlClassService,
    private readonly layoutConfigService: LayoutConfigService
  ) { }


  ngOnInit(): void {
    // this.contentReady = false;
    const config = this.layoutConfigService.getConfig();

    // Update visibility of LayoutAsideLeft if defined on route data.
    // const isAsideLeftActive = get(this.routerOutlet, 'activatedRouteData.layoutOptions.isAsideLeftActive') || get(config, 'aside.self.display');
    // if (!!isAsideLeftActive) {
    //   this.layoutConfigService.setConfig({ aside: { self: { display: isAsideLeftActive } } });
    // }

    this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

    this.selfLayout = get(config, 'self.layout');
    this.asideDisplay = get(config, 'aside.self.display');
    this.subheaderDisplay = get(config, 'subheader.display');
    this.fluid = get(config, 'content.width') === 'fluid';


    // let the layout type change

    const subscr = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
      setTimeout(() => {
        this.selfLayout = get(cfg, 'self.layout');
      });
    });
    this.subscriptions.push(subscr);


 }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
