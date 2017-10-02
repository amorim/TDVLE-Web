import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'register';

  userRegister: User = new User();

  constructor (private http: HttpClient) {
  }

  login() {
    console.log(this.userRegister);
    this.http
      .post('http://localhost:8080/api/register', this.userRegister)
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
  }
}
