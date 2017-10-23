import { Component, OnInit } from '@angular/core';
import {AuthHttp} from '../auth/auth.http';
import {User} from '../model/user.model';
import {Constants} from '../shared/constants';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  autheticatedUser: User = new User();
  followers: User[] = [];
  following: User[] = [];

  constructor(private http: AuthHttp, private userService: UserService) {
    this.userService.getAuthenticatedUser().subscribe(user => {
      console.log(user);
      this.autheticatedUser = user;
      this.userService.getFollowers(this.autheticatedUser.id, 0, 100).subscribe(followers => {
        console.log(followers);
        this.followers = followers;
      });
      this.userService.getFollowing(this.autheticatedUser.id, 0, 100).subscribe(following => {
        console.log(following);
        this.following = following;
      });
    });
  }

  ngOnInit() {
  }
}
