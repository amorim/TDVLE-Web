import { Component, OnInit } from '@angular/core';
import {Post} from '../../model/post.model';
import {Http} from '@angular/http';
import {AuthHttp} from '../auth/auth.http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postObj: Post = new Post();
  constructor(private http: AuthHttp) { }

  post() {
    console.log(this.postObj);
    this.http
      .post('http://localhost:8080/api/user/post', this.postObj)
      .subscribe(data => {
        console.log(data);
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
