import { Component, OnInit } from '@angular/core';
import {FindPeopleComponent} from "../find-people/find-people.component";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent extends FindPeopleComponent implements OnInit {

  au: User;

  ngOnInit() {
    this.userService.getAuthenticatedUser().subscribe((au: User) => {
      this.au = au;
      this.userService.getFollowers(au.id, this.pageSize, this.pageIndex * this.pageSize).subscribe((followers: User[]) => {
        this.users = followers;
      });
      this.userService.getFollowerCount(au.id).subscribe(userCount => {
        this.length = userCount['followerCount'];
      });
    });
  }

  alterPage() {
    this.navigate(this.pageEvent.pageIndex);
    this.userService.getFollowers(this.au.id, this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe((followers: User[]) => {
      this.users = followers;
    });
  }

}
