import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user/user.service';
import {PageEvent} from '@angular/material';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-find-people',
  templateUrl: './find-people.component.html',
  styleUrls: ['./find-people.component.css']
})
export class FindPeopleComponent implements OnInit {

  length = 14;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

  users: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsersPage(this.pageSize, this.pageIndex * this.pageSize).subscribe(users => {
      this.users = users;
      this.userService.getUsersCount().subscribe(userCount => {
        this.length = userCount['userCount'];
        this.pageEvent.length = this.length;
        console.log('There are:', userCount['userCount'], 'users');
      });
      this.pageEvent.pageSize = this.pageSize;
      this.pageEvent.pageIndex = this.pageIndex;
    });
  }

  ngOnInit() {
  }

  alterPage() {
    this.userService.getUsersPage(this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(users => {
      this.users = users;
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
