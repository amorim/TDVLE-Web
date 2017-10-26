import { Component, OnInit } from '@angular/core';
import {App} from '../model/app.model';
import {AppsService} from './apps.service';
import {MatDialog, PageEvent} from '@angular/material';
import {ShowAppDialogComponent} from './show-app-dialog/show-app-dialog.component';
import {UserService} from '../user/user.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  length = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

  user: User = new User();
  apps: App[] = [];

  constructor(private userService: UserService, private appsService: AppsService, public dialog: MatDialog) {
    this.userService.getAuthenticatedUser().subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
    appsService.getApps(this.pageSize, this.pageIndex * this.pageSize).subscribe((apps: App[]) => {
      this.apps = apps;
      appsService.count().subscribe(count => {
        this.length = count['appsCount'];
        console.log(this.length);
        this.pageEvent.length = this.length;
      });
    });
  }

  ngOnInit() {

  }

  alterPage() {
    this.appsService.getApps(this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(apps => {
      this.apps = apps;
    });
  }

  requestApp(): void {
    let dialogRef = this.dialog.open(ShowAppDialogComponent, {width: 'auto', data: {}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  accessApp(app: App) {
    window.location.href = app.uri;
  }

}
