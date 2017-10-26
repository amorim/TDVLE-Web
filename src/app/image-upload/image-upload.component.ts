import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import {Http} from '@angular/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ImageUploadService} from './image-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  image: any;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  cropperSettings: CropperSettings = new CropperSettings();
  toEdit: String;

  constructor(private imageUploadService: ImageUploadService, public dialogRef: MatDialogRef<ImageUploadComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cropperSettings.preserveSize = true;
    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;
    this.cropperSettings.keepAspect = false;
    this.cropperSettings.canvasWidth = 200;
    this.cropperSettings.noFileInput = true;

    this.image = {};
    this.toEdit = data['toEdit'];
    if (this.toEdit === 'Avatar' || this.toEdit === 'App Image') {
      this.cropperSettings.rounded = true;
      this.cropperSettings.croppedWidth = 1000;
      this.cropperSettings.croppedHeight = 1000;
    }
  }

  ngOnInit(): void {
    var dialog = document.getElementsByClassName('myDialog');// .getElementById('dialogContainer');
    console.log(dialog);
    this.cropperSettings.width = dialog[0].clientWidth;
    this.cropperSettings.canvasWidth = dialog[0].clientWidth;
    this.cropperSettings.dynamicSizing = true;
  }

  resized() {
    var dialog = document.getElementsByClassName('myDialog');// .getElementById('dialogContainer');
    console.log(dialog);
    this.cropperSettings.width = dialog[0].clientWidth;
    this.cropperSettings.canvasWidth = dialog[0].clientWidth;
    console.log(this.cropper.cropcanvas);
  }

  onNoClick(): void {
    this.dialogRef.close('');
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  upload() {
    this.imageUploadService.uploadImage(this.image.image).subscribe(done => {
      console.log(done['secure_url']);
      this.dialogRef.close(done['secure_url']);
    });
  }

}
