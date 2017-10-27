import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../model/user.model';
import {Constants} from "../shared/constants";

@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  login(user: User, callback) {
    this.http
      .post(Constants.url + '/login', user)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('access-token', data['access_token']);
        localStorage.setItem('refresh-token', data['refresh_token']);
        callback(true, 0);
      }, error => {
        callback(false, error.status);
      });
  }

  logout() {
    this.clearCookies();
  }

  clearCookies() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }

  getAccessToken() {
    return localStorage.getItem('access-token');
  }
}
