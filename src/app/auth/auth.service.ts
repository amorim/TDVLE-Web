import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Http, RequestOptionsArgs} from '@angular/http';
import {User} from '../../model/user.model';
import {UserService} from '../user/user.service';
import {Constants} from '../shared/constants';
import {AuthHttp} from './auth.http';
import {Headers} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {

  private loggedIn = false;
  constructor(private http: Http, private cookieService: CookieService) {
  }

  login(user: User, callback) {
    this.http
      .post('http://localhost:8080/api/login', user)
      .map(res => res.json())
      .subscribe(data => {
        this.cookieService.set('access-token', data['access_token']);
        this.cookieService.set('refresh-token', data['refresh_token']);
        this.loggedIn = true;
        callback(true, 0);
      }, error => {
        callback(false, error.status);
        console.log('login error');
      });
  }

  logout() {
    this.clearCookies();
    this.loggedIn = false;
  }

  clearCookies() {
    this.cookieService.delete('access-token');
    this.cookieService.delete('refresh-token');
  }

  getAccessToken() {
    return this.cookieService.get('access-token');
  }

  isLoggedIn() {
    return this.loggedIn;
  }
  hasToken() {
    return this.cookieService.get('access-token');
  }
}
