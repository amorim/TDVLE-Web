import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppsService} from "./apps.service";
import {AppsComponent} from "./apps.component";
import {AvatarModule } from "ngx-avatar";
import {MaterialModule} from "../shared/material.module";

@NgModule({
  imports: [
    CommonModule,
    AvatarModule,
    MaterialModule
  ],
  providers: [AppsService],
  declarations: [AppsComponent],
  exports: [AppsComponent]
})
export class AppsModule { }
