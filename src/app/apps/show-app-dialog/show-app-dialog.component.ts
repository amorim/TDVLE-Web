import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AppsService} from '../apps.service';
import {App} from '../../model/app.model';
import {ImageUploadComponent} from '../../image-upload/image-upload.component';

@Component({
  selector: 'app-show-app-dialog',
  templateUrl: './show-app-dialog.component.html',
  styleUrls: ['./show-app-dialog.component.scss']
})
export class ShowAppDialogComponent implements OnInit {

  appObj: App = new App();

  constructor(private appsService: AppsService, public imageDialog: MatDialog, public dialogRef: MatDialogRef<ShowAppDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
  }

  request() {
    this.appsService.requestIntegration(this.appObj).subscribe(app => {
      console.log('App requested:', app);
      this.dialogRef.close(true);
    });
  }

  uploadDialog() {
    let imageDialogRef = this.imageDialog.open(ImageUploadComponent, {width: 'auto', data: {toEdit: 'App Image'}});
    imageDialogRef.afterClosed().subscribe(result => {
      console.log('Image Upload dialog was closed');
      this.appObj.image = result;
    });
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.request();
    }
  }

}
