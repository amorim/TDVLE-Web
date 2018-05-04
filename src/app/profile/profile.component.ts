import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  loggedUser: User = new User();
  posts: Post[];
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private postService: PostService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getAuthenticatedUser().subscribe((user: User) => {
      this.loggedUser = user;
      if (id != null) {
        this.userService.getUser(id).subscribe((subUser: User) => {
          this.user = subUser;
          this.isLoggedUser = user.id === subUser.id;
          console.log(this.isLoggedUser);
          this.fetchPosts();
        });
      } else {
        this.user = user;
        this.isLoggedUser = true;
        this.fetchPosts();
      }
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe(done => {
      this.router.navigate(['people']);
    });
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

  isAdmin() {
    if (this.loggedUser != null && this.loggedUser.authority != null) {
      for (let i = 0; i < this.loggedUser.authority.length; i ++) {
        if (this.loggedUser.authority[i].authority === 'ROLE_ADMIN') {
          return true;
        }
      }
    }
    return false;
  }

  toggleLike(post: Post, idx:  number) {
    let like = new Like();
    like.post = post;
    this.postService.setLike(like).subscribe((newPost: Post) => {
      this.posts[idx] = newPost;
    });
  }
}
