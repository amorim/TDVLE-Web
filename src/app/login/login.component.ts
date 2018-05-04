import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  userLogin: User = new User();

  constructor (private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute, private userService: UserService) {
    this.userService.getAuthenticatedUser().subscribe((user: User) => {
      this.router.navigate(['/post']);
    });
  }

  login() {
    this.authService.login(this.userLogin, this.callback.bind(this));
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  callback(logged, code) {
    if (code === 0) {
      this.snackBar.open('Logged In', 'Dismiss', {duration: 2000});
      this.router.navigateByUrl(this.returnUrl);
    } else if (code === 401) {
      this.snackBar.open('Wrong password or User not found', 'Dismiss', {duration: 2000});
    }

  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.login();
    }
  }
}
