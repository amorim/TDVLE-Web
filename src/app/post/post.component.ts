import { Component, OnInit } from '@angular/core';
import {Post} from '../model/post.model';
import {PostService} from "./post.service";
import {PageEvent} from "@angular/material";

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

  postObj: Post = new Post();
  posts: Post[] = [];

  constructor(private postService: PostService) {
    this.postService.getPostCount().subscribe(postCount => {
      this.length = postCount['postCount'];
      console.log('There are:', this.length, 'posts');
    });
    this.postService.getPosts(this.pageSize, this.pageIndex * this.pageSize).subscribe(posts => {
      console.log('Posts:', posts);
      this.posts = posts;
    });
  }

  post() {
    this.postService.setPost(this.postObj).subscribe(post => {
      this.posts.unshift(post);
    });
  }

  ngOnInit() {
  }

  alterPage() {
    console.log('Getting new page');
    this.postService.getPosts(this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(posts => {
      console.log('Posts:', posts);
      this.posts = posts;
    });
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.post();
    }
  }
}
