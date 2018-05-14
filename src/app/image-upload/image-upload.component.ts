import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CropperSettings, ImageCropperComponent} from 'ngx-img-cropper';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ImageUploadService} from './image-upload.service';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";

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
  fileUploadProgress = undefined;
  uploadingNow = false;

  constructor(private http: HttpClient, private imageUploadService: ImageUploadService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ImageUploadComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
    this.cropperSettings.canvasWidth = dialog[0].clientWidth;
    console.log(this.cropperSettings.canvasWidth);
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
    const req = new HttpRequest('POST', 'https://api.cloudinary.com/v1_1/ngn/image/upload', {'file': this.image.image, 'upload_preset': 'qcbitdy3'}, {
      reportProgress: true,
    });
    this.http.request(req).subscribe((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadingNow = true;
        this.fileUploadProgress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.uploadingNow = false;
        if (event.status != 200) {
          this.snackBar.open('Error uploading image. Try again.', 'Dismiss', {duration: 2000});
        }
        else {
          this.snackBar.open('Image uploaded successfully.', 'Dismiss', {duration: 2000});
          this.dialogRef.close(event.body.secure_url);
        }
      }
    });
  }

  openFileSelect() {
    document.getElementById("upp").click();
  }
}
