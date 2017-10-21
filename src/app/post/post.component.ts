import { Component, OnInit } from '@angular/core';
import {Post} from '../../model/post.model';
import {AuthHttp} from '../auth/auth.http';
import {PostService} from "./post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postObj: Post = new Post();
  posts: Post[] = [];
  postCount = 0;

  constructor(private postService: PostService) {
    this.postService.getPosts().subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    });
    this.postService.getPostCount().subscribe(postCount => {
      console.log('There are:', postCount['postCount'], 'posts');
      this.postCount = postCount;
    });
  }

  post() {
    this.postService.setPost(this.postObj).subscribe(post => {
      this.posts.unshift(post);
    });
      // this.posts.unshift(JSON.parse(JSON.stringify(post)));
  }

  ngOnInit() {
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.post();
    }
  }
}
