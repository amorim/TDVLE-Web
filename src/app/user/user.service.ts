import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../../model/user.model';
import {AuthHttp} from '../auth/auth.http';
import {AppComponent} from '../app.component';
import {Constants} from '../shared/constants';

@Injectable()
export class UserService {

  constructor() { }

  getAuthenticatedUser(): Observable<User> {
    return new Observable();
  }
}
