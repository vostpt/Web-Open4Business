import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';



// TODO: THIS MUST BE REMOVED! ANOTHER SOLUTION SHOULD BE FOUND! NO DEPENDENCIES OF THIS KIND! By Tavares
// I should be a shamed of this code!!!!!!!!!
// import { Constants } from '@app/config/constants';


@Injectable()
export class ApiOutInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*
    const context = {
      scope: Constants.SERVICE_KEY
    };
*/
    // TODO change this when auth is implemented
    // tslint:disable-next-line: max-line-length
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiJwZWRyby5zYW50b3NAZG9tYXRpY2EucHQiLCJzZXNzaW9uSWQiOiJlMDdkZjIxMC03YzM2LTExZWEtYTE5My1hN2JhZmY0NDg1OTMiLCJzZXNzaW9uVHlwZSI6ImFwaSIsIm51bWJlck9mTG9naW5zIjoyLCJsYXN0TG9naW5EYXRlIjoxNTg2NjM4NTcyLCJ0dGwiOjE3MjgwMCwiY3JlYXRlZEF0IjoxNTg2NjM4NTcyLCJpYXQiOjE1ODY2Mzg1NzJ9.Tsiwrq4RyQfmqffNl9AI-4HiV7xSRexBrLJqZ4lyogIpCCc7IqcpJs-Yt6_wzmBhRNfXdWretNYxfehTYXDbSivJ0i9FgeEhcKInKPX7Q9F-vx7hew-W2t4fxDwQTqqgifsB7qxI2xVcwMyL21iGJ7lDBjfi14bQe84ZA_ytyCsg2JJfW9aCYY20_PX_aP7kG8U6iFD1GlFr5ckx1LpmVa_3_lPZ0VLCYiF6F8tSELwmJbgyNXOt0cuwC5k4cU7c6HcU0lMbY_RGQ0LfNiH3V6Xfr8ZeNWVlAKM96b7YChMNdqaUSDsfBiVh5LCg9fRFRk-l16Lq4BMfQYvny6xShGTXvWjuQ7M8iaJEFIC3M-s-9wR56HRbqDvrFBc2QGUSBP_MfEvAgDrpi8PRdKwdlQu21ufqp3AbBUEeTJnICcTwOWgDKButhJvXdl5h1i1EUj_O-1jD37tYl1IZhm9She3loFoR1WNZNnDqiL2C2YHAeMN7ffHYbsnLpQVaK5f-aTFB1OVTnspO1weBleq6nXsj0JLKw_lAjMg-zC51z5GJImMRktKyu0uC1GGEpogab_bgQ7IXEn36x_7jZu62unowhHGkuh4csdSPUMwTLS5UtJ7QjtEvBhp_LGWrq8sxhkZfK2CnUcxbzSWU2NAfEbBp-axS-VsFrni2JxbSEGs';
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Accept-Language': 'en',  // TODO: Improve possibility to send another language!
        // 'authorization': 'Bearer ' + localStorage.getItem('token'), // TODO change this when auth is implemented
        'authorization': `Bearer ${token}`
        // 'X-Context': btoa(JSON.stringify(context))
      }
    });

    return next.handle(request);
  }

}
