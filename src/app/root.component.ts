import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSidenav} from '@angular/material';
import {User} from "./model/user.model";
import {UserService} from "./user/user.service";
import {Notification} from "./model/notification.model";
import {Constants} from './shared/constants';
import {Router} from "@angular/router";

@Component({
  selector: 'app-app',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('avatar') avatar: any;

  authenticatedUser: User = new User();
  notificationsList: Notification[] = [];
  notificationCount = 0;
  intervalId: any;
  urls = [{path: '/welcome', icon: 'home', desc: 'Home'},
    {path: '/profile', icon: 'person', desc: 'Profile'},
    {path: '/people', icon: 'people', desc: 'People'},
    {path: '/post', icon: 'forum', desc: 'Posts'},
    {path: '/apps', icon: 'apps', desc: 'Apps'}];

  constructor (private userService: UserService, private router: Router) {
    this.userService.getAuthenticatedUser().subscribe(au => {
      this.authenticatedUser = au;
    });
    this.userService.getUserUpdated().subscribe((user: User) => {
      this.authenticatedUser.avatar = user.avatar;
      this.avatar.src = user.avatar.toString();
      console.log(this.avatar.src, user.avatar);
    });
    this.getNotifications();
    this.intervalId = setInterval(() => { this.getNotifications(); }, Constants.notificationUpdateTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }


  getNotifications() {
    this.userService.getNotificationsCount().subscribe(notificationCount => {
      this.notificationCount = notificationCount['notificationCount'];
    });

    this.userService.getNotifications().subscribe(notifications => {
      this.notificationsList = notifications;
    });
  }

  disposeSidenav() {
    setTimeout(this.toggleSidenav.bind(this), 100);
  }

  readNotifications() {
    this.notificationCount = 0;
    this.userService.setReadNotifications().subscribe();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  deleteNotif(i: number, $event) {
    let notif = this.notificationsList[i];
    this.userService.deleteNotification(notif.id).subscribe();
    this.notificationsList.splice(i, 1);
    $event.stopPropagation();
    return false;
  }

  openUri(uri: string) {
    this.router.navigate([uri]);
  }

}
