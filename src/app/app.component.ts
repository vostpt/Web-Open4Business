import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '@core-modules/core';
import { GoogleAnalyticsService } from '@core-modules/core/services/google-analytics.service';

import { locale as ptLanguage } from './config/translations/pt';
import { locale as enLanguage } from './config/translations/en';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private titleService: Title,
    private router: Router,
    private translateService: TranslateService,
    private loader: NgxSpinnerService,
    private googleAnalytics: GoogleAnalyticsService
  ) {
    this.translateService.addLangs(['pt', 'en']);
    this.translateService.setDefaultLang(environment.defaultLanguage.toLowerCase());
    this.translateService.setTranslation(ptLanguage.lang, ptLanguage.data, true);
    this.translateService.setTranslation(enLanguage.lang, enLanguage.data, true);

    this.titleService.setTitle( translateService.instant('app.title') );

    this.googleAnalytics.start();
  }


  ngOnInit(): void {

    this.loader.show('splash-screen-loader');

    const routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        this.loader.hide('splash-screen-loader'); // hide splash screen
        
        window.scrollTo(0, 0); // scroll to top on every route change

        setTimeout(() => { // to display back the body content
          document.body.classList.add('kt-page--loaded');
        }, 500);
      }
    });
    this.subscriptions.push(routerSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
