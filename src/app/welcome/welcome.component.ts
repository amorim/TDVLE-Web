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
      this.users = users;
      this.userService.getUsersCount().subscribe(quantity => {
        this.length = quantity['userCount'];
        this.pageEvent.length = this.length;
        console.log('There are: ', this.length, ' users');
      });
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

  alterPage() {
    console.log('Getting new page');
    this.userService.getUsersPage(this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(users => {
      console.log('fock', users);
      this.users = users;
      this.userService.getAuthenticatedUser().subscribe(user => {
        this.userService.getFollowing(user.id).subscribe(following => {
          this.following = following;
        });
      });
    });
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
    this.snackBar.open('Logged Out', 'Dismiss', {duration: 500});
    this.router.navigate(['/login']);
  }

  toggleFollow(user) {
    if (this.isFollowing(user)) {
      this.following.splice(this.getPosition(user), 1);
      this.userService.deleteFollow(user.id);
    } else {
      this.following.push(user);
      this.userService.setFollow(user.id);
    }
  }
}
