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

  followers: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getFollowers(this.pageSize, this.pageIndex * this.pageSize).subscribe(users => {
      this.followers = users;
      this.userService.getFollowerCount().subscribe(userCount => {
        this.length = userCount['followerCount'];
        this.pageEvent.length = this.length;
      });
      this.pageEvent.pageSize = this.pageSize;
      this.pageEvent.pageIndex = this.pageIndex;
    });
  }

  ngOnInit() {
  }

  alterPage() {
    this.userService.getFollowers(this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(users => {
      this.followers = users;
    });
  }

  isFollowing(user: User) {
    return user.isFollowing;
  }

  getFollowingText(user: User) {
    if (this.isFollowing(user)) {
      return ('Unfollow');
    } else {
      return('Follow');
    }
  }

  toggleFollow(user: User) {
    if (this.isFollowing(user)) {
      this.userService.deleteFollow(user.id);
      user.isFollowing = false;
    } else {
      this.userService.setFollow(user.id);
      user.isFollowing = true;
    }
  }

}
