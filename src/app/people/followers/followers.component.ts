import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import {User} from '../../model/user.model';
import {UserService} from '../../user/user.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  length = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent;

  authenticatedUser: User = new User();
  followers: User[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    let param = route.snapshot.queryParams['page'];
    if (!param) {
      param = 0;
      this.navigate(param);
    }
    this.pageIndex = param;
    this.userService.getAuthenticatedUser().subscribe(au => {
      this.authenticatedUser = au;
      this.userService.getFollowers(this.authenticatedUser.id, this.pageSize, this.pageIndex * this.pageSize).subscribe(followers => {
        this.followers = followers;
      });
      this.userService.getFollowerCount(this.authenticatedUser.id).subscribe(userCount => {
        this.length = userCount['followerCount'];
      });
    });
  }

  ngOnInit() {

  }

  navigate(pagen: number) {
    this.router.navigate([], {queryParams: {page: pagen}, relativeTo: this.route},);
  }

  alterPage() {
    this.navigate(this.pageEvent.pageIndex);
    this.userService.getFollowers(this.authenticatedUser.id, this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(followers => {
      this.followers = followers;
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
