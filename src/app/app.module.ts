import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuard} from './auth/auth.guard';
import {AuthHttp} from './auth/auth.http';
import {Http, HttpModule} from '@angular/http';
import {AuthService} from './auth/auth.service';
import {AuthModule} from './auth/auth.module';
import {UserService} from './user/user.service';
import { PostComponent } from './post/post.component';
import {MaterialModule} from "./material.module";
import {UserModule} from "./user/user.module";
import {TimeAgoPipe} from 'time-ago-pipe';
import {UserComponent} from "./user/user.component";
import {AvatarModule} from "ngx-avatar";

const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterComponent,
    PostComponent,
    TimeAgoPipe
  ],
  imports: [
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
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
