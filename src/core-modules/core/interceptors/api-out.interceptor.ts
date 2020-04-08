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
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiJkZXYudGVhbUBkb21hdGljYS5wdCIsInNlc3Npb25JZCI6IjZmZTViZmUwLTZlMjMtMTFlYS1hMjIzLTg1YTFlNzk4NjcwZiIsImV4dGVybmFsSWQiOiIyNCIsImV4dGVybmFsVHlwZSI6InVzZXIiLCJzZXNzaW9uVHlwZSI6ImFwaSIsImNyZWF0ZWRBdCI6MTU4NTA5MDkwNywiaWF0IjoxNTg1MDkwOTA2fQ.hhMXW8JKutd59VtM5XW00vOvep7vgCbSSHDoX7x_dE3Vsbny4umklHUGg7foXTta6rT6PCVWS-Fmxdl5HVAM1nCTfMXdTvFfrZWG-JCUGdY-ZBFiUEraWNjOUIKp-zf7kV65zul_Id7f8ytoGv_EgrUBIRCjFCVIkkHO4BitIeu15wM9wivjrM3YM80c74wJ3_NMvMNyDvABg_k5t8fcXODEn9DXCRAxkNZ-EN16q0y4pC_7xMEUHWJ5m-kiHnWlL80g3e0DXwEA795SAQOQjlhwei-PDkGKyzieayU6WAcPl1qsSmOsyEuxPX50hkQ6O96GL5L4RD7c-ONOqj3q9PPl7UXSE_ylYp-9jWjq5bQ-cDSh_nbSNsLCnzMnIfHdojY_wIj3oBZRWUU9tOw8Zy79qVhgjVvmLRR-FVtnvfoYLrhg6sdQSaS8EoUZqaQUcCxSnqdU2hpNNIjze2LUD9oWehNF6a84NOGFaZmCY3oOX202fZAyQ1mSgME8fbmlfGgbiXJNhRFZpfEcqaR00vaxBTWGbzDehNt7fRSB60BAqOfqrBbJ-m2E8YdI40HM8_GYSm4-1GmGDtnZThhuPrQ_WPduHbER4KxaOQlNRBOZN9tj-TSKMLYzFis2MxCO_a_czFh6KbPzFREu5ZIinErjQfKlXgSXacjO3z0ksTc';
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'en',  // TODO: Improve possibility to send another language!
        // 'authorization': 'Bearer ' + localStorage.getItem('token'), // TODO change this when auth is implemented
        'authorization': `Bearer ${token}`
        // 'X-Context': btoa(JSON.stringify(context))
      }
    });

    return next.handle(request);
  }

}
