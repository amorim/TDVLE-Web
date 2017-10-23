import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostService} from "./post.service";
import {PostComponent} from "./post.component";
import {MaterialModule} from "../shared/material.module";
import {RouterModule} from "@angular/router";
import {TimeAgoPipe} from "time-ago-pipe";
import {UserService} from "../user/user.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [],
  providers: [PostService, UserService]
})
export class PostModule { }
