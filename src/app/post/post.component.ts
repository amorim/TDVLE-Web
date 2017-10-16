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
    http.get('http://localhost:8080/api/user/post').map(res => res.json()).subscribe((json: Post[]) => {
      this.posts = json;
    });
  }

  post() {
    this.http
      .post('http://localhost:8080/api/user/post', this.postObj)
      .subscribe(data => {
        console.log(data);
      });
    this.postObj.date = new Date();
    this.posts.unshift(JSON.parse(JSON.stringify(this.postObj)));
  }

  ngOnInit() {
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.post();
    }
  }
}
