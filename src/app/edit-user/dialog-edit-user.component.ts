import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {Http} from "@angular/http";
import {UserService} from "../user/user.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-user-edit',
  templateUrl: 'dialog-edit-user.component.html',
  styleUrls: ['dialog-edit-user.component.css']
})
export class DialogEditUserComponent implements OnInit {

  image: any;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  cropperSettings: CropperSettings = new CropperSettings();
  user: User = new User();
  toEdit: String;

  constructor(private http: Http, private userService: UserService, public dialogRef: MatDialogRef<DialogEditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.cropperSettings.preserveSize = true;
    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;
    this.cropperSettings.keepAspect = false;
    this.cropperSettings.canvasWidth = 200;
    this.cropperSettings.noFileInput = true;

    this.image = {};
    this.user = data['user'];
    this.toEdit = data['toEdit'];
    if (this.toEdit === 'Avatar') {
      this.cropperSettings.rounded = true;
      this.cropperSettings.croppedWidth = 1000;
      this.cropperSettings.croppedHeight = 1000;
    }
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
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

  editUser(url) {
    if (this.toEdit === 'Avatar') {
      this.user.avatar = url;
    } else {
      this.user.background = url;
    }
  }

  upload() {
    this.http.post('https://api.cloudinary.com/v1_1/ngn/image/upload', {'file': this.image.image, 'upload_preset': 'qcbitdy3'}).subscribe(done => {
      console.log(done.json()['secure_url']);
      this.editUser(done.json()['secure_url']);
      console.log(this.user);
      this.userService.setUser(this.user).subscribe();
    });
  }

}
