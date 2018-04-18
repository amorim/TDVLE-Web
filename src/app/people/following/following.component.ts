import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {FindPeopleComponent} from "../find-people/find-people.component";

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent extends FindPeopleComponent implements OnInit {

  au: User;

  ngOnInit() {
    this.userService.getAuthenticatedUser().subscribe(au => {
      this.au = au;
      this.userService.getFollowing(au.id, this.pageSize, this.pageIndex * this.pageSize).subscribe(following => {
        this.users = following;
      });
      this.userService.getFollowingCount(au.id).subscribe(followingCount => {
        this.length = followingCount['followingCount'];
      });
    });
  }

  alterPage() {
    this.navigate(this.pageEvent.pageIndex);
    this.userService.getFollowing(this.au.id, this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(following => {
      this.users = following;
    });
  }

}
