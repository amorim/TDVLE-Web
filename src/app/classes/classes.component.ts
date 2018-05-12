import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar, PageEvent} from '@angular/material';
import {User} from '../model/user.model';
import {UserService} from '../user/user.service';
import {Class} from '../model/class.model';
import {ClassService} from './class.service';
import {ShowCreateClassDialogComponent} from './show-create-class-dialog/show-create-class-dialog.component';
import {ShowEnterClassDialogComponent} from './show-enter-class-dialog/show-enter-class-dialog.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  length = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

  user: User = new User();
  classes: Class[] = [];

  constructor(private userService: UserService, private classService: ClassService, public dialog: MatDialog, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    let param = route.snapshot.queryParams['page'];
    if (!param) {
      param = 0;
      this.navigate(param);
    }
    this.pageIndex = param;
    this.userService.getAuthenticatedUser().subscribe((user: User) => {
      this.user = user;
    });
    classService.getClasses(this.pageSize, this.pageIndex * this.pageSize).subscribe((classes: Class[]) => {
      this.classes = classes;
      classService.getClassesCount().subscribe(count => {
        this.length = count['classCount'];
        this.pageEvent.length = this.length;
      });
    });
  }

  ngOnInit() {
  }

  navigate(pagen: number) {
    this.router.navigate([], {queryParams: {page: pagen}, relativeTo: this.route},);
  }

  createClass() {
    const dialogRef = this.dialog.open(ShowCreateClassDialogComponent, {width: 'auto', data: {}});
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result[0]) {
        this.snackBar.open('Class created successfully', 'Dismiss', {duration: 2000});
        this.classes.unshift(result[1]);
      }
    });
  }

  enterClass() {
    const dialogRef = this.dialog.open(ShowEnterClassDialogComponent, {width: 'auto', data: {}});
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result[0]) {
        this.snackBar.open('Entered class successfully', 'Dismiss', {duration: 2000});
        this.classes.unshift(result[1]);
      }
    });
  }

  accessClass(clazz) {
    this.router.navigate(['/class/{{clazz.id}}']);
  }

}
