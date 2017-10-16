import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar, PageEvent} from "@angular/material";
import {UserService} from "../user/user.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  length = 14;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent;

  users: User[] = [];
  following: User[] = [];

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private userService: UserService) {
    this.userService.getUsersPage(this.pageSize, this.pageIndex * this.pageSize).subscribe(users => {
      console.log('There are ', users.length, ' users');
      this.users = users;
      this.length = this.users.length;
      this.pageEvent.length = this.length;
      this.pageEvent.pageSize = this.pageSize;
      this.pageEvent.pageIndex = this.pageIndex;
      this.userService.getAuthenticatedUser().subscribe(user => {
        this.userService.getFollowing(user.id).subscribe(following => {
          this.following = following;
        });
      });
    });
  }

  ngOnInit() {
  }

  paginationFrom(pageEvent) {
    console.log(pageEvent);
    if (pageEvent) {
      // console.log(pageEvent.pageIndex * pageEvent.pageSize);
      return(pageEvent.pageIndex * pageEvent.pageSize);
    }
  }

  paginationTo(pageEvent) {
    if (pageEvent) {
      // console.log((pageEvent.pageIndex * pageEvent.pageSize) + pageEvent.pageSize);
      return((pageEvent.pageIndex * pageEvent.pageSize) + pageEvent.pageSize);
    }
  }

  getPosition(user) {
    return (this.following.findIndex(currUser => {
      return (user.id === currUser.id);
    }));
  }

  isFollowing(user) {
    return(this.getPosition(user) > - 1);
  }

  getFollowingText(user) {
    if (this.isFollowing(user)) {
      return ('Unfolow');
    } else {
      return('Follow');
    }
  }

  logout() {
    this.authService.logout();
    this.snackBar.open('Logged Out', 'Dismiss', {});
    this.router.navigate(['/login']);
  }

  toogleFollow(user) {
    if (this.isFollowing(user)) {
      this.following.splice(this.getPosition(user), 1);
      this.userService.deleteFollow(user.id);
    } else {
      this.following.push(user);
      this.userService.setFollow(user.id);
    }
  }
}
