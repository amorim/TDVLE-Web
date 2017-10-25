import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AppsService} from '../apps.service';
import {App} from '../../model/app.model';

@Component({
  selector: 'app-show-app-dialog',
  templateUrl: './show-app-dialog.component.html',
  styleUrls: ['./show-app-dialog.component.scss']
})
export class ShowAppDialogComponent implements OnInit {

  appObj: App = new App();

  constructor(private appsService: AppsService, public dialogRef: MatDialogRef<ShowAppDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  request() {
    console.log('FOI');
  }

}
