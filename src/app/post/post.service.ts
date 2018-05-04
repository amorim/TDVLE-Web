import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Post} from "../model/post.model";
import {Constants} from "../shared/constants";
import {Like} from "../model/like.model";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(max, offset) {
    return this.http.get(Constants.url + '/posts?max=' + max + '&offset=' + offset);
  }

  getUserPosts(user, max, offset) {
    return this.http.get(Constants.url + '/users/' + user.id + '/posts?max=' + max + '&offset=' + offset);
  }

  getPost(id) {
    return this.http.get(Constants.url + '/posts/' + id);
  }

  getPostCount() {
    return this.http.get(Constants.url + '/posts/count');
  }

  setPost(postObj: Post) {
    return this.http.post(Constants.url + '/user/post', postObj);
  }

  setLike(like: Like) {
    return this.http.post(Constants.url + '/posts/like', like);
  }

}
