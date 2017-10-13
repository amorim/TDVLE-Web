import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material";
import {UserService} from "../user/user.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  users: User[] = [];
  following: User[] = [];

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private userService: UserService) {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.userService.getAuthenticatedUser().subscribe(user => {
        this.userService.getFollowing(user.id).subscribe(following => {
          this.following = following;
          console.log(this.users[1], this.following, this.users[1] === this.users[1], this.users[1] === this.following[0]);
        });
      });
    });
  }

  ngOnInit() {
  }

  sameId(a: User, b: User): boolean {
    return a.id === b.id;
  }

  logout() {
    this.authService.logout();
    this.snackBar.open('Logged Out', 'Dismiss', {});
    this.router.navigate(['/login']);
  }

  follow(id) {
    this.userService.setFollow(id);
  }

  unfollow(id) {
    this.userService.deleteFollow(id);
  }
}
