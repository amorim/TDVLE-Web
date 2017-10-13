import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class AuthHttp {

  constructor(private http: Http, private authService: AuthService) { }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.request(url, this.setAuthHeader(options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(url, this.setAuthHeader(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(url, body, this.setAuthHeader(options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(url, body, this.setAuthHeader(options));
  }

  del(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(url, this.setAuthHeader(options));
  }

  setAuthHeader(options: RequestOptionsArgs): RequestOptionsArgs {
    options = options || {};
    options.headers = options.headers || new Headers();

    options.headers.append('Authorization', 'Bearer ' + this.authService.getAccessToken());

    return options;
  }
}
