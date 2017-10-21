import { Injectable } from '@angular/core';
import {AuthHttp} from "../auth/auth.http";
import {Observable} from "rxjs/Observable";
import {Post} from "../../model/post.model";
import {Constants} from "../shared/constants";

@Injectable()
export class PostService {

  constructor(private http: AuthHttp) { }

  getPosts(): Observable<Post[]> {
    return this.http.get(Constants.url + '/users/posts').map(res => res.json());
  }

  getPostCount(): Observable<number> {
    return this.http.get(Constants.url + '/users/posts/count').map(res => res.json());
  }

  setPost(postObj: Post): Observable<Post> {
    return this.http.post('/user/post', postObj).map(res => res.json());
  }

}
