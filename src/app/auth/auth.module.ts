import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';
import {AuthGuard} from './auth.guard';
import {AuthHttp} from './auth.http';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ ]
})
export class AuthModule { }
