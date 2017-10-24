import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import {User} from '../../model/user.model';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  length = 14;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent;

  authenticatedUser: User = new User();
  following: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getAuthenticatedUser().subscribe(au => {
      this.authenticatedUser = au;
      this.userService.getFollowing(this.authenticatedUser.id, this.pageSize, this.pageIndex * this.pageSize).subscribe(following => {
        this.following = following;
      });
      this.userService.getFollowingCount(this.authenticatedUser.id).subscribe(followingCount => {
        this.length = followingCount['followingCount'];
      });
    });
  }

  ngOnInit() {
  }

  alterPage() {
    this.userService.getFollowing(this.authenticatedUser.id, this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(following => {
      this.following = following;
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
