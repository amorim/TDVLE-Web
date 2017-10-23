import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import {User} from '../../model/user.model';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  length = 14;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent;

  autheticatedUser: User = new User();
  followers: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getAuthenticatedUser().subscribe(au => {
      this.autheticatedUser = au;
      this.userService.getFollowers(this.autheticatedUser.id, this.pageSize, this.pageIndex * this.pageSize).subscribe(followers => {
        this.followers = followers;
      });
      this.userService.getFollowerCount(this.autheticatedUser.id).subscribe(userCount => {
        this.length = userCount['followerCount'];
      });
    });
  }

  ngOnInit() {
  }

  alterPage() {
    this.userService.getFollowers(this.autheticatedUser.id, this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(users => {
      this.followers = users;
    });
  }

  getFollowingText(user: User) {
    if (user.isFollowing) {
      return ('Unfollow');
    } else {
      return('Follow');
    }
  }

  toggleFollow(user: User) {
    if (user.isFollowing) {
      this.userService.deleteFollow(user.id);
      user.isFollowing = false;
    } else {
      this.userService.setFollow(user.id);
      user.isFollowing = true;
    }
  }

}
