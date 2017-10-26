import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Observer} from 'rxjs/Observer';
import {Constants} from '../shared/constants';
import {RequestOptionsArgs, Headers, Http} from '@angular/http';
import {UserService} from "../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {

  }

  canActivate(route, state) {
    return Observable.create((observer: Observer<boolean>) => {
      this.userService.getAuthenticatedUser().subscribe(data => {
        observer.next(true);
        observer.complete();
      }, error => {
        this.authService.clearCookies();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        observer.error(false);
        observer.complete();
      });
    });
  }
}
