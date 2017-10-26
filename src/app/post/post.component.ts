import { Component, OnInit } from '@angular/core';
import {Post} from '../model/post.model';
import {PostService} from "./post.service";
import {MatDialog, PageEvent} from '@angular/material';
import {User} from "../model/user.model";
import {UserService} from "../user/user.service";
import {Like} from "../model/like.model";
import {ImageUploadComponent} from '../image-upload/image-upload.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  length = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent;

  authenticatedUser: User = new User();
  postObj: Post = new Post();
  posts: Post[] = [];

  constructor(private postService: PostService, private userService: UserService, private dialog: MatDialog) {
    this.userService.getAuthenticatedUser().subscribe(user => {
      this.authenticatedUser = user;
    });
    this.postService.getPostCount().subscribe(postCount => {
      this.length = postCount['postCount'];
    });
    this.postService.getPosts(this.pageSize, this.pageIndex * this.pageSize).subscribe(posts => {
      this.posts = posts;
    });
  }

  post() {
    this.postService.setPost(this.postObj).subscribe((newPost: Post) => {
      this.posts.unshift(newPost);
      this.length ++;
    });
  }

  ngOnInit() {
  }

  alterPage() {
    this.postService.getPosts(this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(posts => {
      this.posts = posts;
    });
  }

  openDialog(toEdit): void {
    let dialogRef = this.dialog.open(ImageUploadComponent, {width: 'auto', data: {toEdit: toEdit}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.postObj.image = result;
    });
  }

  toggleLike(post: Post) {
    let like = new Like();
    like.post = post;
    this.postService.setLike(like).subscribe((newPost: Post) => {
      const idx = this.posts.indexOf(post, 0);
      this.posts[idx] = newPost;
    });
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.post();
    }
  }
}
