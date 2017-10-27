import { Component, OnInit } from '@angular/core';
import {App} from '../model/app.model';
import {AppsService} from './apps.service';
import {MatDialog, MatSnackBar, PageEvent} from '@angular/material';
import {ShowAppDialogComponent} from './show-app-dialog/show-app-dialog.component';
import {UserService} from '../user/user.service';
import {User} from '../model/user.model';
import {Authority} from '../model/authority.model';

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

  constructor(private userService: UserService, private appsService: AppsService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.userService.getAuthenticatedUser().subscribe(user => {
      this.user = user;
    });
    appsService.getApps(this.pageSize, this.pageIndex * this.pageSize).subscribe((apps: App[]) => {
      this.apps = apps;
      appsService.count().subscribe(count => {
        this.length = count['appsCount'];
        this.pageEvent.length = this.length;
        console.log(this.apps);
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

  approveApp(app: App) {
    this.appsService.approveRequest(app.id).subscribe(done => {
      app.approved = true;
      console.log(done);
    });
  }

  requestApp(): void {
    let dialogRef = this.dialog.open(ShowAppDialogComponent, {width: 'auto', data: {}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('App requested successfully', 'Dismiss', {duration: 2000});
      }
    });
  }

  deleteApp(app: App, i: number) {
    this.appsService.deleteApp(app.id).subscribe(done => {
      this.apps.splice(i, 1);
    });
  }

  isAdmin() {
    if (this.user != null && this.user.authority != null) {
      for (var i = 0; i < this.user.authority.length; i ++) {
        if (this.user.authority[i].authority === 'ROLE_ADMIN') {
          return true;
        }
      }
    }
    return false;
  }

  accessApp(app: App) {
    window.location.href = app.uri;
  }

}
