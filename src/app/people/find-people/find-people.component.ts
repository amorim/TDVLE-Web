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

  length = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

  users: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsersPage(this.pageSize, this.pageIndex * this.pageSize).subscribe(users => {
      this.users = users;
      this.userService.getUsersCount().subscribe(userCount => {
        this.length = userCount['userCount'];
      });
    });
  }

  ngOnInit() {
  }

  alterPage() {
    this.userService.getUsersPage(this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(users => {
      this.users = users;
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
