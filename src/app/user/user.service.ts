import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user.model';
import {AuthHttp} from '../auth/auth.http';
import {Constants} from '../shared/constants';
import {Notification} from "../model/notification.model";

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

  deleteNotification(id: number): Observable<any> {
    return this.http.del(Constants.url + '/notifications/' + id).map(res => res.json());
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

  registerUser(user: User): Observable<User> {
    return this.http.post(Constants.url + '/register', user).map(res => res.json());
  }

  setUser(user: User): Observable<User> {
    return this.http.put(Constants.url + '/user', user).map(res => res.json());
  }

  getUser(id): Observable<User> {
    return this.http.get(Constants.url + '/profile/' + id).map(res => res.json());
  }

  getFollowers(id, max, offset): Observable<User[]> {
    return this.http.get(Constants.url + '/users/' + id + '/followers?max=' + max + '&offset=' + offset).map(res => res.json());
  }

  getFollowerCount(id): Observable<number> {
    return this.http.get(Constants.url + '/users/' + id + '/follower/count').map(res => res.json());
  }

  getFollowing(id, max, offset): Observable<User[]> {
    return this.http.get(Constants.url + '/users/' + id + '/following?max=' + max + '&offset=' + offset).map(res => res.json());
  }

  getFollowingCount(id): Observable<number> {
    return this.http.get(Constants.url + '/users/' + id + '/following/count').map(res => res.json());
  }

  setFollow(id) {
    this.http.post(Constants.url + '/users/' + id + '/followers', null).subscribe(data => {

    });
  }

  deleteFollow(id) {
    this.http.del(Constants.url + '/users/' + id + '/followers').subscribe(data => {

    });
  }
}
