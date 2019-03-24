import { Component, OnInit } from '@angular/core';
import {Class} from '../../model/class.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AppsService} from '../../apps/apps.service';
import {ShowAppDialogComponent} from '../../apps/show-app-dialog/show-app-dialog.component';
import {ClassService} from '../class.service';

@Component({
  selector: 'app-show-create-class-dialog',
  templateUrl: './show-create-class-dialog.component.html',
  styleUrls: ['./show-create-class-dialog.component.scss']
})
export class ShowCreateClassDialogComponent implements OnInit {

  clazz: Class = new Class();

  constructor(private classService: ClassService, public imageDialog: MatDialog, public dialogRef: MatDialogRef<ShowAppDialogComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close([false, false]);
  }

  create() {
    this.classService.createClass(this.clazz).subscribe(clazz => {

      this.dialogRef.close([true, clazz]);
    });
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.create();
    }
  }

}
