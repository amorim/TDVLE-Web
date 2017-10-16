import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "./user.service";
import {UserComponent} from "./user.component";
import {MaterialModule} from "../material.module";
import {RouterModule} from "@angular/router";
import {AppModule} from "../app.module";

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
