import { CloudinaryModule } from '@cloudinary/angular-4.x';
import * as Cloudinary from 'cloudinary-core';
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from './auth/auth.guard';
import {Http, HttpModule} from '@angular/http';
import {AuthModule} from './auth/auth.module';
import { PostComponent } from './post/post.component';
import {MaterialModule} from "./shared/material.module";
import {UserModule} from "./user/user.module";
import {TimeAgoPipe} from 'time-ago-pipe';
import {UserComponent} from "./user/user.component";
import {AvatarModule} from "ngx-avatar";
import { PeopleComponent } from './people/people.component';
import { FindPeopleComponent } from './people/find-people/find-people.component';
import { FollowersComponent } from './people/followers/followers.component';
import { FollowingComponent } from './people/following/following.component';
import {PostModule} from "./post/post.module";
import { AppsComponent } from './apps/apps.component';
import { ProfileComponent } from './profile/profile.component';
import {ImageCropperComponent, ImageCropperModule} from 'ng2-img-cropper';

const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'people', component: PeopleComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'find', pathMatch: 'full'},
    {path: 'find', component: FindPeopleComponent},
    {path: 'followers', component: FollowersComponent},
    {path: 'following', component: FollowingComponent}
  ]},
  { path: 'apps', component: AppsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterComponent,
    PostComponent,
    TimeAgoPipe,
    PeopleComponent,
    FindPeopleComponent,
    FollowersComponent,
    FollowingComponent,
    AppsComponent,
    ProfileComponent
  ],
  imports: [
    ImageCropperModule,
    CloudinaryModule.forRoot(Cloudinary, {cloud_name: 'ngn', api_key: '295533173244583', api_secret: 'xiGfbeV5PXiYqKzB9VyOBfEYP6w'}),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    UserModule,
    PostModule,
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
