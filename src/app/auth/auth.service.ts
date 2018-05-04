import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Constants} from "../shared/constants";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: User, callback) {
    this.http
      .post(Constants.url + '/login', user)
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
