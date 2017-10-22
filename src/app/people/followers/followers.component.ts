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

  authenticatedUserId = -1;
  following: User[] = [];
  followers: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getFollowerCount().subscribe(followerCount => {
      console.log('There are:', followerCount['followerCount'], 'followers');
      this.length = followerCount['followerCount'];
    });

    this.userService.getAuthenticatedUser().subscribe(user => {
      this.authenticatedUserId = user.id;
      this.userService.getFollowers(user.id, this.pageSize, this.pageIndex * this.pageSize).subscribe(followers => {
        this.followers = followers;
      });

      this.userService.getFollowing(user.id).subscribe(following => {
        this.following = following;
      });
    });
  }

  ngOnInit() {
  }

  alterPage() {
    console.log('Getting new page');
    this.userService.getFollowers(this.authenticatedUserId, this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(users => {
      this.followers = users;
      this.userService.getFollowing(this.authenticatedUserId).subscribe(following => {
        this.following = following;
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
