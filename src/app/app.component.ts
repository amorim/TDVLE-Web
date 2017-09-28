import { Component } from '@angular/core';
import { User } from '../model/user.model';
import {HttpClient, HttpClientModule, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Headers, RequestOptions} from '@angular/http';
import {UserLogin} from '../model/user-login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  userLogin: UserLogin = new UserLogin();

  constructor (private http: HttpClient) {
  }

  login() {
    console.log(this.userLogin);
    this.http
      .post('http://localhost:8080/api/login', this.userLogin)
      .subscribe(data => {
        console.log(data);
      });
  }
}
