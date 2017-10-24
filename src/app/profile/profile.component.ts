import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../user/user.service';
import {ActivatedRoute} from '@angular/router';
import {Cloudinary} from '@cloudinary/angular-4.x';
import {CropperSettings} from 'ng2-img-cropper';
import {Http} from '@angular/http';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data: any;
  cropperSettings: CropperSettings;
  user: User = new User();

  constructor(private http: Http, private userService: UserService, private route: ActivatedRoute) {
    this.cropperSettings = new CropperSettings();
    this.data = {};
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.userService.getAuthenticatedUser().subscribe(user => {
        this.user = user;
        if (this.user.background == null) {
          this.user.background = 'http://2.bp.blogspot.com/-91pJBele_kY/U7e13L_b7KI/AAAAAAAAMNI/HgViWJhc6hY/s0/shiro-chibi-jibril-stephanie+dora-sora-q-chiang-1920x1080.jpg';
        }
      });
    } else {
      this.userService.getUser(id).subscribe(user => {
        this.user = user;
        if (this.user.background == null) {
          this.user.background = 'https://2.bp.blogspot.com/-91pJBele_kY/U7e13L_b7KI/AAAAAAAAMNI/HgViWJhc6hY/s0/shiro-chibi-jibril-stephanie+dora-sora-q-chiang-1920x1080.jpg';
        }
      });
    }
  }

  isFollowing(user: User) {
    return this.user.isFollowing;
  }

  getFollowingText() {
    if (this.isFollowing(this.user)) {
      return ('Unfollow');
    } else {
      return('Follow');
    }
  }

  toggleFollow() {
    if (this.isFollowing(this.user)) {
      this.userService.deleteFollow(this.user.id);
      this.user.isFollowing = false;
    } else {
      this.userService.setFollow(this.user.id);
      this.user.isFollowing = true;
    }
  }

  upload() {
    this.http.post('https://api.cloudinary.com/v1_1/ngn/image/upload', {'file': this.data.image, 'upload_preset': 'qcbitdy3'}).subscribe(done => {
      console.log(done);
    });
  }
}
