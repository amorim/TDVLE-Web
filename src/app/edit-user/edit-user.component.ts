import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../model/user.model";
import {MatDialog, MatSnackBar} from '@angular/material';
import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {Authority} from '../model/authority.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User = new User();
  authorities: Authority[] = [];

  constructor(private userService: UserService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.userService.getAuthenticatedUser().subscribe((user: User) => {
      this.user = user;
    });
    this.userService.getAuthorities().subscribe((authorities: Authority[]) => {
      console.log(authorities);
      this.authorities = authorities;
    });
  }

  ngOnInit() {
  }

  update() {
    console.log(this.authorities);
    this.userService.setUser(this.user).subscribe(done => {
      this.userService.updateUser(this.user);
      this.snackBar.open('Updated user successfully', 'Dismiss', {duration: 2000});
    });
  }

  insertUserImage(toEdit: string, url: string) {
    if (toEdit === 'Avatar') {
      this.user.avatar = url;
    } else {
      this.user.background = url;
    }
  }

  openDialog(toEdit): void {
    let dialogRef = this.dialog.open(ImageUploadComponent, {width: 'auto', data: {toEdit: toEdit}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.insertUserImage(toEdit, result);
    });
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.update();
    }
  }

}
