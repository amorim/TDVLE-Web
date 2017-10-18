import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../../model/user.model';
import {AuthHttp} from '../auth/auth.http';
import {AppComponent} from '../app.component';
import {Constants} from '../shared/constants';
import {Notification} from "../../model/notification.model";
import {ObjectUnsubscribedError} from 'rxjs/Rx';

@Injectable()
export class UserService {

  constructor(private http: AuthHttp) { }

  getNotifications(): Observable<Notification[]> {
    return this.http.get(Constants.url + '/notifications').map(res => res.json());
  }

  getNotificationsCount(): Observable<number> {
    return this.http.get(Constants.url + '/notifications/count').map(res => res.json());
  }

  setReadNotifications(): Observable<Object> {
    return this.http.post(Constants.url + '/notifications/read', null).map(res => res.json());
  }

  getUsers(): Observable<User[]> {
    return this.http.get(Constants.url + '/users/').map(res => res.json());
  }

  getUsersCount(): Observable<number> {
    return this.http.get(Constants.url + '/users/count').map(res => res.json());
  }

  getUsersPage(max, offset): Observable<User[]> {
    return this.http.get(Constants.url + '/users?max=' + max + '&offset=' + offset).map(res => res.json());
  }

  getAuthenticatedUser(): Observable<User> {
    return this.http.get(Constants.url + '/user').map(res => res.json());
  }

  getFollowers(id, max, offset): Observable<User[]> {
    return this.http.get(Constants.url + '/users/' + id + '/followers?max=' + max + '&offset=' + offset).map(res => res.json());
  }

  getFollowerCount(): Observable<number> {
    return this.http.get(Constants.url + '/users/follower/count').map(res => res.json());
  }

  getFollowing(id): Observable<User[]> {
    return this.http.get(Constants.url + '/users/' + id + '/following').map(res => res.json());
  }

  setFollow(id) {
    this.http.post(Constants.url + '/users/' + id + '/followers', null).subscribe(data => {
      console.log(data);
    });
  }

  deleteFollow(id) {
    this.http.del(Constants.url + '/users/' + id + '/followers').subscribe(data => {
      console.log(data);
    });
  }
}
