import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Http} from '@angular/http';
import {User} from '../../model/user.model';

@Injectable()
export class AuthService {

  constructor(private http: Http, private cookieService: CookieService) {
  }

  login(user: User, callback) {
    this.http
      .post('http://localhost:8080/api/login', user)
      .map(res => res.json())
      .subscribe(data => {
        this.cookieService.set('access-token', data['access_token']);
        this.cookieService.set('refresh-token', data['refresh_token']);
        callback(true, 0);
      }, error => {
        callback(false, error.status);
        console.log('login error');
      });
  }

  logout() {
    this.clearCookies();
  }

  clearCookies() {
    this.cookieService.delete('access-token');
    this.cookieService.delete('refresh-token');
  }

  getAccessToken() {
    return this.cookieService.get('access-token');
  }
}
