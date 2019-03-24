import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ClassService} from '../class.service';
import {ShowAppDialogComponent} from '../../apps/show-app-dialog/show-app-dialog.component';
import {Class} from '../../model/class.model';

@Component({
  selector: 'app-show-enter-class-dialog',
  templateUrl: './show-enter-class-dialog.component.html',
  styleUrls: ['./show-enter-class-dialog.component.scss']
})
export class ShowEnterClassDialogComponent implements OnInit {

  classAccessCode: string;

  constructor(private classService: ClassService, public imageDialog: MatDialog, public dialogRef: MatDialogRef<ShowAppDialogComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close([false, false]);
  }

  enter() {
    this.classService.enterClass(this.classAccessCode).subscribe(clazz => {

      this.dialogRef.close([true, clazz]);
    });
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.enter();
    }
  }

}
