import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../model/user.model";
import {MatDialog} from "@angular/material";
import {DialogEditUserComponent} from "./dialog-edit-user.component";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.userService.getAuthenticatedUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  update() {
    this.userService.setUser(this.user).subscribe(done => {
    });
  }

  openDialog(toEdit): void {
    let dialogRef = this.dialog.open(DialogEditUserComponent, {width: 'auto', data: {user: this.user, toEdit: toEdit}});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.update();
    }
  }

}
