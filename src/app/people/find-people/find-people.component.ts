import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user/user.service';
import {PageEvent} from '@angular/material';
import {User} from '../../../model/user.model';

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
  pageEvent: PageEvent = new PageEvent;

  users: User[] = [];
  following: User[] = [];

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
