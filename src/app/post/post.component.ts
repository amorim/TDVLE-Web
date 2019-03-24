import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Post} from '../model/post.model';
import {PostService} from "./post.service";
import {MatDialog, PageEvent} from '@angular/material';
import {User} from "../model/user.model";
import {UserService} from "../user/user.service";
import {Like} from "../model/like.model";
import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {ActivatedRoute, Router} from "@angular/router";
import {Masonry, MasonryGridItem} from "ng-masonry-grid";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css', '../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})

export class PostComponent implements AfterViewInit {

  masonry: Masonry;
  length = 0;
  pageSize = 25;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent;

  authenticatedUser: User = new User();
  postObj: Post = new Post();
  posts: Post[] = [];
  postsReady = false;

  constructor(private postService: PostService, private ref: ChangeDetectorRef, private userService: UserService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) {
    let param = route.snapshot.queryParams['page'];
    if (!param) {
      param = 0;
      this.navigate(param);
    }
    this.pageIndex = param;
    this.postObj.description = route.snapshot.queryParams['content'] || "";
    this.postObj.image = route.snapshot.queryParams['imageUrl'] || "";
    this.userService.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    });
    this.postService.getPostCount().subscribe(postCount => {
      this.length = postCount['postCount'];
    });
    this.postService.getPosts(this.pageSize, this.pageIndex * this.pageSize).subscribe((posts: Post[]) => {
      this.posts.push(...posts);
      this.postsReady = true;
    });

  }

  post() {
    this.postService.setPost(this.postObj).subscribe((newPost: Post) => {
      this.masonry.setAddStatus('prepend');
      this.posts.splice(0, 0, newPost);
      this.length ++;
    });

  }

  ngAfterViewInit() {

  }

  onNgMasonryInit($event) {
    this.masonry = $event;
    if (this.masonry) {
      this.masonry.setAddStatus('add');

      setTimeout(() => {

      }, 5000);
    }
  }
  masonryLayoutComplete($event) {

  }

  alterPage() {
    this.masonry.removeAllItems();
    this.postsReady = false;
    this.ref.detectChanges();
    this.navigate(this.pageEvent.pageIndex);
    this.postService.getPosts(this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe((posts: Post[]) => {
      this.posts = posts;
      this.postsReady = true;
    });
  }

  navigate(pagen: number) {
    this.router.navigate([], {queryParams: {page: pagen}, relativeTo: this.route},);
  }

  openDialog(toEdit): void {
    let dialogRef = this.dialog.open(ImageUploadComponent, {width: 'auto', data: {toEdit: toEdit}});
    dialogRef.afterClosed().subscribe(result => {

      this.postObj.image = result;
    });
  }

  toggleLike(post: Post, idx: number) {
    let like = new Like();
    like.post = post;
    this.postService.setLike(like).subscribe((newPost: Post) => {
      this.posts[idx].hasLiked = newPost.hasLiked;
      this.posts[idx].likeCount = newPost.likeCount;
      this.posts[idx].likes = newPost.likes;
    });
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.post();
    }
  }
}
