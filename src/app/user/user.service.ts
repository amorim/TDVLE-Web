import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../../model/user.model';
import {AuthHttp} from '../auth/auth.http';
import {AppComponent} from '../app.component';
import {Constants} from '../shared/constants';

@Injectable()
export class UserService {

  constructor(private http: AuthHttp) { }

  getAuthenticatedUser(): Observable<User> {
    return this.http.get(Constants.url + '/user').map(res => res.json());
  }
}
