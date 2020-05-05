import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';

import { Router } from '@angular/router';
import * as objectPath from 'object-path';
import { LayoutConfigService } from '../../services/layout-config.service';

import { HtmlClassService } from '../../services/html-class.service';

@Component({
  selector: 'app-layout-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideLeftComponent implements OnInit, AfterViewInit {
  @ViewChild('asideMenu', { static: true }) asideMenu: ElementRef;

  currentRouteUrl = '';
  insideTm: any;
  outsideTm: any;

  menuCanvasOptions: object = {
    baseClass: 'kt-aside',
    overlay: true,
    closeBy: 'kt_aside_close_btn',
    toggleBy: {
      target: 'kt_aside_mobile_toggler',
      state: 'kt-header-mobile__toolbar-toggler--active'
    }
  };

  constructor(
    public htmlClassService: HtmlClassService,
    public layoutConfigService: LayoutConfigService,
    private router: Router,
    private render: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    const config = this.layoutConfigService.getConfig();

    if (objectPath.get(config, 'aside.menu.dropdown') !== true && objectPath.get(config, 'aside.self.fixed')) {
      this.render.setAttribute(this.asideMenu.nativeElement, 'data-ktmenu-scroll', '1');
    }

    if (objectPath.get(config, 'aside.menu.dropdown')) {
      this.render.setAttribute(this.asideMenu.nativeElement, 'data-ktmenu-dropdown', '1');
      this.render.setAttribute(this.asideMenu.nativeElement, 'data-ktmenu-dropdown-timeout', objectPath.get(config, 'aside.menu.submenu.dropdown.hover-timeout'));
    }

  }

  /**
   * Use for fixed left aside menu, to show menu on mouseenter event.
   * @param e Event
   */
  mouseEnter(e: Event) {
    // check if the left aside menu is fixed
    if (document.body.classList.contains('kt-aside--fixed')) {
      if (this.outsideTm) {
        clearTimeout(this.outsideTm);
        this.outsideTm = null;
      }

      this.insideTm = setTimeout(() => {
        // if the left aside menu is minimized
        if (document.body.classList.contains('kt-aside--minimize') && KTUtil.isInResponsiveRange('desktop')) {
          // show the left aside menu
          this.render.removeClass(document.body, 'kt-aside--minimize');
          this.render.addClass(document.body, 'kt-aside--minimize-hover');
        }
      }, 50);
    }
  }

  /**
   * Use for fixed left aside menu, to show menu on mouseenter event.
   * @param e Event
   */
  mouseLeave(e: Event) {
    if (document.body.classList.contains('kt-aside--fixed')) {
      if (this.insideTm) {
        clearTimeout(this.insideTm);
        this.insideTm = null;
      }

      this.outsideTm = setTimeout(() => {
        // if the left aside menu is expand
        if (document.body.classList.contains('kt-aside--minimize-hover') && KTUtil.isInResponsiveRange('desktop')) {
          // hide back the left aside menu
          this.render.removeClass(document.body, 'kt-aside--minimize-hover');
          this.render.addClass(document.body, 'kt-aside--minimize');
        }
      }, 100);
    }
  }

}
