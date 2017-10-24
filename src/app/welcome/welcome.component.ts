import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar, PageEvent} from "@angular/material";
import {UserService} from "../user/user.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.snackBar.open('Logged Out', 'Dismiss', {duration: 2000});
    this.router.navigate(['/login']);
  }

}
