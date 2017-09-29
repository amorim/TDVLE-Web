import { Component, OnInit } from '@angular/core';
import {UserLogin} from '../../model/user-login.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'login';

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

  ngOnInit() {
  }

}
