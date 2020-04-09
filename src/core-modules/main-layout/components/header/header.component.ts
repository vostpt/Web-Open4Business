import { AfterViewInit, Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { AsideRightComponent } from '../aside-right/aside-right.component';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { LayoutConfigService } from '../../services/layout-config.service';
import { HtmlClassService } from '../../services/html-class.service';

import * as objectPath from 'object-path';

@Component({
  selector: 'app-main-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;
  @ViewChild(AsideRightComponent) asideRightComponent: AsideRightComponent;

  private subscriptions: Subscription[] = [];

  menuHeaderDisplay: boolean;
  fluid: boolean;

  constructor(
    private readonly router: Router,
    private readonly layoutConfigService: LayoutConfigService,
    public readonly loader: LoadingBarService,
    public readonly htmlClassService: HtmlClassService
  ) {
    // page progress bar percentage
    this.subscriptions.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          // set page progress bar loading to start on NavigationStart event router
          this.loader.start();
        }
        if (event instanceof RouteConfigLoadStart) {
          this.loader.increment(35);
        }
        if (event instanceof RouteConfigLoadEnd) {
          this.loader.increment(75);
        }
        if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
          // set page progress bar loading to end on NavigationEnd event router
          this.loader.complete();
        }
      })
    );
  }

  ngOnInit(): void {
    const config = this.layoutConfigService.getConfig();

    // get menu header display option
    // const isSubHeaderActive = get(this.routerOutlet, 'activatedRouteData.layoutOptions.isSubHeaderActive');
    // if (!!isSubHeaderActive) {
    //   this.layoutConfigService.setConfig({ header: { menu: { self: { display: isSubHeaderActive } } } });
    // }
    // this.menuHeaderDisplay = isSubHeaderActive;
    this.menuHeaderDisplay = objectPath.get(config, 'header.menu.self.display');

    // header width fluid
    this.fluid = objectPath.get(config, 'header.self.width') === 'fluid';

    // animate the header minimize the height on scroll down
    if (objectPath.get(config, 'header.self.fixed.desktop.enabled') || objectPath.get(config, 'header.self.fixed.desktop')) {
      // header minimize on scroll down
      this.ktHeader.nativeElement.setAttribute('data-ktheader-minimize', '1');
    }
  }

  ngAfterViewInit(): void {
    // keep header element in the service
    // this.ktHeader.nativeElement.setAttribute('data-ktheader-minimize', '1');

    this.asideRightComponent.open();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
