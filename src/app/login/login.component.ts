import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'login';

  userLogin: User = new User();
  token = '';

  constructor (private http: HttpClient) {
  }

  login() {
    console.log(this.userLogin);
    this.http
      .post('http://localhost:8080/api/login', this.userLogin)
      .subscribe(data => {
        console.log(data);
        this.token = data['access_token'];
      });
  }

  ngOnInit() {
  }
}
