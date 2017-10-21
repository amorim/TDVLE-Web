import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../shared/material.module";
import {PostComponent} from "./post.component";
import {PostService} from "./post.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [PostComponent],
  providers: [PostService]
})
export class PostModule { }
