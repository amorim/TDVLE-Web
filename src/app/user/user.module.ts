import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "./user.service";
import {UserComponent} from "./user.component";
import {MaterialModule} from "../shared/material.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [UserComponent],
  providers: [UserService]
})
export class UserModule { }
