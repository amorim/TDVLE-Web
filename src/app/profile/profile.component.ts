import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../user/user.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from "../model/post.model";
import {PostService} from "../post/post.service";
import {Like} from "../model/like.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoggedUser = false;
  user: User = new User();
  posts: Post[];
  constructor(private userService: UserService, private route: ActivatedRoute, private postService: PostService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isLoggedUser = id == null;
    if (this.isLoggedUser) {
      this.userService.getAuthenticatedUser().subscribe(user => {
        this.user = user;
        this.fetchPosts();
      });
    } else {
      this.userService.getUser(id).subscribe(user => {
        this.user = user;
        this.fetchPosts();
      });
    }
  }

  fetchPosts() {
    this.postService.getUserPosts(this.user, 10, 0).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  isFollowing(user: User) {
    return this.user.isFollowing;
  }

  getFollowingText() {
    if (this.isFollowing(this.user)) {
      return ('Unfollow');
    } else {
      return('Follow');
    }
  }

  toggleFollow() {
    if (this.isFollowing(this.user)) {
      this.userService.deleteFollow(this.user.id);
      this.user.isFollowing = false;
    } else {
      this.userService.setFollow(this.user.id);
      this.user.isFollowing = true;
    }
  }

  toggleLike(post: Post, idx:  number) {
    let like = new Like();
    like.post = post;
    this.postService.setLike(like).subscribe((newPost: Post) => {
      this.posts[idx] = newPost;
    });
  }
}
