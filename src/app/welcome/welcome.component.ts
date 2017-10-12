import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private snackBar: MdSnackBar) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
    this.snackBar.open('Logged Out', 'Dismiss', {});
    this.router.navigate(['/login']);
  }
}
