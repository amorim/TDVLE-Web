import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppsService} from "./apps.service";
import {AppsComponent} from "./apps.component";
import {AvatarModule } from "ngx-avatar";
import {MaterialModule} from "../shared/material.module";
import { IntegrateComponent } from './integrate/integrate.component';
import { ShowAppDialogComponent } from './show-app-dialog/show-app-dialog.component';

@NgModule({
  declarations: [AppsComponent, IntegrateComponent, ShowAppDialogComponent],
  imports: [
    CommonModule,
    AvatarModule,
    MaterialModule
  ],
  entryComponents: [ShowAppDialogComponent],
  providers: [AppsService],
  exports: [AppsComponent, ShowAppDialogComponent]
})
export class AppsModule { }
