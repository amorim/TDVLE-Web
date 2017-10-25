import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../post/post.service";
import {Post} from "../model/post.model";
import {Like} from "../model/like.model";
import {User} from "../model/user.model";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  postId: string;
  post: Post = new Post();

  constructor(private route: ActivatedRoute, private postService: PostService) { this.post.user = new User(); }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postId = id;
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
  }

  toggleLike(post: Post) {
    let like = new Like();
    like.post = post;
    this.postService.setLike(like).subscribe((newPost: Post) => {
      console.log('Liked:', newPost);
    });
  }

  getLikeText(post: Post) {
    if (post.hasLiked) {
      return 'Dislike';
    } else {
      return 'Like';
    }
  }
}
