import { Component, OnInit } from '@angular/core';
import {AuthHttp} from '../auth/auth.http';
import {User} from '../../model/user.model';
import {Constants} from '../shared/constants';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  user: User = new User();

  constructor(private http: AuthHttp, private userService: UserService) {
    console.log(this.userService.getAuthenticatedUser());
  }

  ngOnInit() {
  }
}
