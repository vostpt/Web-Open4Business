import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { environment } from '../models/environment.model';

declare var gtag: any;
declare var window: any;

// <script async
// src="https://www.googletagmanager.com/gtag/js?id=UA-164640622-1"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'UA-164640622-1');
// </script>

@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  public started = false;

  constructor(
    @Inject(DOCUMENT) document: any,
  ) {
    if (environment.googleAnalytics) {
      this.loadGoogleAnalytics();
    }
  }

  loadGoogleAnalytics() {
    // injecting GA main script asynchronously
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalytics}`;
    script.async = true;
    document.body.appendChild(script);

    // preparing GA API to be usable even before the async script is loaded
    window.dataLayer = window.dataLayer || [];
    window.gtag = () => {
      window.dataLayer.push(arguments);
    };
    gtag('js', new Date());

    // tracking current url at app bootstrap
    gtag('config', `${environment.googleAnalytics}`);
  }

  start() {
    this.started = true;
  }
}
