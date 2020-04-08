import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

import { locale as ptLanguage } from './config/translations/pt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private loader: NgxSpinnerService
    //private layoutConfigService: LayoutConfigService,
    //private splashScreenService: SplashScreenService
  ) {
    this.translateService.addLangs(['pt']);
    this.translateService.setDefaultLang('pt');
    this.translateService.setTranslation(ptLanguage.lang, ptLanguage.data, true);
		//this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);
   }


  ngOnInit(): void {

    this.loader.show('splash-screen-loader');

    //this.translateService.setDefaultLang('en');
    //this.translateService.use('en');


    const routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // hide splash screen
        this.loader.hide('splash-screen-loader');

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
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
