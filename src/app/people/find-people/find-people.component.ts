import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user/user.service';
import {PageEvent} from '@angular/material';
import {User} from '../../model/user.model';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-find-people',
  templateUrl: './find-people.component.html',
  styleUrls: ['./find-people.component.css']
})
export class FindPeopleComponent implements OnInit {

  length = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

  users: User[] = [];

  constructor(protected userService: UserService, protected router: Router, protected route: ActivatedRoute) {
    let param = this.route.snapshot.queryParams['page'];
    if (!param) {
      param = 0;
      this.navigate(param);
    }
    this.pageIndex = param;
  }

  ngOnInit() {
    this.userService.getUsersPage(this.pageSize, this.pageIndex * this.pageSize).subscribe(users => {
      this.users = users;
      this.userService.getUsersCount().subscribe(userCount => {
        this.length = userCount['userCount'];
      });
    });
  }

  alterPage() {
    this.navigate(this.pageEvent.pageIndex);
    this.userService.getUsersPage(this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(users => {
      this.users = users;
      window.scrollTo(0,0);
    });
  }

  navigate(pagen: number) {
    this.router.navigate([], {queryParams: {page: pagen}, relativeTo: this.route},);
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
