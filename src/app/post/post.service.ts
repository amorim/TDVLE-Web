import { Injectable } from '@angular/core';
import {AuthHttp} from "../auth/auth.http";
import {Observable} from "rxjs/Observable";
import {Post} from "../model/post.model";
import {Constants} from "../shared/constants";
import {Like} from "../model/like.model";

@Injectable()
export class PostService {

  constructor(private http: AuthHttp) { }

  getPosts(max, offset): Observable<Post[]> {
    return this.http.get(Constants.url + '/posts?max=' + max + '&offset=' + offset).map(res => res.json());
  }

  getPost(id): Observable<Post> {
    return this.http.get(Constants.url + '/posts/' + id).map(res => res.json());
  }

  getPostCount(): Observable<number> {
    return this.http.get(Constants.url + '/posts/count').map(res => res.json());
  }

  setPost(postObj: Post): Observable<Post> {
    return this.http.post(Constants.url + '/user/post', postObj).map(res => res.json());
  }

  setLike(like: Like): Observable<Post> {
    return this.http.post(Constants.url + '/posts/like', like).map(res => res.json());
  }

}
