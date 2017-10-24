import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSidenav} from '@angular/material';
import {User} from "./model/user.model";
import {UserService} from "./user/user.service";
import {Notification} from "./model/notification.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  authenticatedUser: User = new User();
  notificationsList: Notification[] = [];
  notificationCount = 0;

  urls = [{path: 'welcome', icon: 'home', desc: 'Home'},
    {path: 'profile', icon: 'person', desc: 'Profile'},
    {path: 'people', icon: 'people', desc: 'People'},
    {path: 'post', icon: 'forum', desc: 'Posts'},
    {path: 'apps', icon: 'apps', desc: 'Apps'}];

  constructor (private userService: UserService) {
    this.userService.getAuthenticatedUser().subscribe(au => {
      this.authenticatedUser = au;
    });
    setInterval(() => { this.getNotifications(); }, 100000);
  }

  getNotifications() {
    this.userService.getNotificationsCount().subscribe(notificationCount => {
      console.log('There are:', notificationCount['notificationCount'], 'notifications');
      this.notificationCount = notificationCount['notificationCount'];
    });

    this.userService.getNotifications().subscribe(notifications => {
      console.log('Notifications:', notifications);
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

}
