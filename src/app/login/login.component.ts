import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {CookieService} from 'ngx-cookie-service';
import {AuthHttp} from '../auth/auth.http';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'login';

  userLogin: User = new User();

  constructor (private authHttp: AuthHttp, private authService: AuthService, private router: Router) {
    if (this.authService.hasToken()) {
      this.router.navigate(['/welcome']);
    }
  }

  login() {
    this.authService.login(this.userLogin, this.callback.bind(this));
  }

  ngOnInit() {
  }

  callback(logged, code) {
    console.log(logged);
    console.log(code);
    alert('LOGOU');
    this.router.navigate(['/welcome']);
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.login();
    }
  }
}
