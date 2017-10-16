import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSidenav} from '@angular/material';
import {User} from "../model/user.model";
import {UserService} from "./user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  users: User[] = [];

  constructor (private userService: UserService) {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }


}
