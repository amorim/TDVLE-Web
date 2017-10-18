import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSidenav} from '@angular/material';
import {User} from "../model/user.model";
import {UserService} from "./user/user.service";
import {Notification} from "../model/notification.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  notificationsList: Notification[] = [];
  notificationCount = 0;

  constructor (private userService: UserService) {
    this.userService.getNotificationsCount().subscribe(notificationCount => {
      console.log('There are', notificationCount['notificationCount'], 'notifications');
      this.notificationCount = notificationCount['notificationCount'];
    });

    this.userService.getNotifications().subscribe(notifications => {
      console.log('Notifications:', notifications);
      this.notificationsList = notifications;
    });
  }

  readNotifications() {
    this.notificationCount = 0;
    this.userService.setReadNotifications().subscribe();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
