import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {Authority} from '../model/authority.model';
import {UserService} from '../user/user.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-authority',
  templateUrl: './edit-authority.component.html',
  styleUrls: ['./edit-authority.component.scss']
})
export class EditAuthorityComponent implements OnInit {

  user: User = new User();
  authorities: Authority[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
    });
    this.userService.getAuthoritiesFromUser(id).subscribe((authorities: Authority[]) => {
      console.log(authorities);
      this.authorities = authorities;
    });
  }

  update() {
    this.userService.setAuthorities(this.authorities, this.user.id).subscribe((done) => {
      this.snackBar.open('Updated Authorities', 'Dismiss', {duration: 2000});
    });
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.update();
    }
  }

}
