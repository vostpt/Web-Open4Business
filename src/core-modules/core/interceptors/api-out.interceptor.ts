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
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiJwZWRyby5zYW50b3NAZG9tYXRpY2EucHQiLCJzZXNzaW9uSWQiOiIxYzU1NWFjMC03YWQ1LTExZWEtYjRhYy1jZGZjYjgxOWM2YjYiLCJzZXNzaW9uVHlwZSI6ImFwaSIsIm51bWJlck9mTG9naW5zIjoxLCJsYXN0TG9naW5EYXRlIjoxNTg2NDg2NjMxLCJ0dGwiOjE3MjgwMCwiY3JlYXRlZEF0IjoxNTg2NDg2NjMxLCJpYXQiOjE1ODY0ODY2MzF9.dOhJ87_3K3jwUGT1xwnRxsT6GaaY5bZg-WgE3FQF_k0MIfWNb679x5qzvec-CpY4-0dlP6O3qz0dVBVtZKQDgZVe57kmcwawwnwMopP2yFXhqDEWxbdThzsNkRAbJL16oOx7qZ9TTJ7baA3KRTOEd7f4h5snQPyeQJpWVD8VIilEuZDN0idUbJfM8OIeDorki4troLX4yyPbXP22A7M-0BLM-nCxtXJOr0k6CpMl4_oCSqUELsYLxJUgyZqcWKsKKBG9J13-JWrIarFWj4ZZQrOh1g_waD7n3FSUz6M6JtTKzV-cIE3sdLW3ZTnCkpBDSbLJsD4LDbyn95uQ3uJktkdWSMV_JrL0InG065kJOOXR7twcdoObzLdEvfMYG3J7C0uHeeFQRv9Lk8tKt4uCLOpLO6BVBoZOVbQc-Ds24QcFnwLV5gqFT-__JmG26q3Lk2Ad0iHz_KWMkCT2Wu-OJaOsl_rZoCME9NnUXpKGMvQc-XExUIZov-OdKW7Ps02J9fgDDQWXzdEEP6hQ4bvnB6BBLqtv_I3ffokBlB7wBo40Nf-t6ABqj1tsfXG8S5ZoiMT-CCmESwE1QqQje0HnfR5Cg4sR9ScoCZxN7stJsH-FuQotGYotPKW8qARapNSQ_XTOFqMRRs-VlDllrCS_mbbvJu53PkY20JvSwqz5NvM';
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
