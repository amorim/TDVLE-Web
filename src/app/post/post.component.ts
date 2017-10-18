import { Component, OnInit } from '@angular/core';
import {Post} from '../../model/post.model';
import {AuthHttp} from '../auth/auth.http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postObj: Post = new Post();
  posts: Post[] = [];
  constructor(private http: AuthHttp) {
    http.get('http://localhost:8080/api/users/posts').map(res => res.json()).subscribe((json: Post[]) => {
      console.log(json);
      this.posts = json;
      http.get('http://localhost:8080/api/users/posts/count').subscribe(postCount => {
        console.log(postCount);
      });
    });
  }

  post() {
    this.http.post('http://localhost:8080/api/user/post', this.postObj).map(res => res.json()).subscribe((post: Post) => {
      this.posts.unshift(JSON.parse(JSON.stringify(post)));
    });
  }

  ngOnInit() {
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.post();
    }
  }
}
