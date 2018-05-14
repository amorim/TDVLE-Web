import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSidenav, MatSnackBar} from '@angular/material';
import {User} from "./model/user.model";
import {UserService} from "./user/user.service";
import {Notification} from "./model/notification.model";
import {Constants} from './shared/constants';
import {Router} from "@angular/router";
import {AuthService} from "./auth/auth.service";
import {NgxPermissionsService} from "ngx-permissions";

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
    {path: '/apps', icon: 'apps', desc: 'Apps'},
    {path: '/classes', icon: 'forum', desc: 'Classes'}
  ];

  constructor (private userService: UserService, private router: Router, private authService: AuthService, private snackBar: MatSnackBar, private permissionService: NgxPermissionsService) {
    this.userService.getAuthenticatedUser().subscribe((au: User) => {
      this.authenticatedUser = au;
      let perm = [];
      for (let a of au.authority) {
        perm.push(a.authority);
      }
      this.permissionService.loadPermissions(perm);
    });
    this.userService.getUserUpdated().subscribe((user: User) => {
      this.authenticatedUser = user;
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

    this.userService.getNotifications().subscribe((notifications: Notification[]) => {
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

  logout() {
    this.authService.logout();
    this.snackBar.open('Logged Out', 'Dismiss', {duration: 2000});
    this.router.navigate(['/login']);
  }
}
