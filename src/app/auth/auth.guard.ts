import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Observer} from 'rxjs/Observer';
import {Constants} from '../shared/constants';
import {RequestOptionsArgs, Headers, Http} from '@angular/http';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private http: Http, private authService: AuthService, private router: Router) {

  }

  canActivate(route, state) {
    return Observable.create((observer: Observer<boolean>) => {
      this.http.get(Constants.url + '/user', this.setAuthHeader(null)).map(res => res.json()).subscribe(data => {
        observer.next(true);
        observer.complete();
      }, error => {
        if (error.status === 401) {
          this.authService.clearCookies();
          this.router.navigate(['/login']);
        }
        observer.error(false);
        observer.complete();
      });
    });
  }

  setAuthHeader(options: RequestOptionsArgs): RequestOptionsArgs {
    options = options || {};
    options.headers = options.headers || new Headers();

    options.headers.append('Authorization', 'Bearer ' + this.authService.getAccessToken());

    return options;
  }
}
