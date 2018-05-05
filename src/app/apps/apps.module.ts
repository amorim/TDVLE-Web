import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppsService} from "./apps.service";
import {AppsComponent} from "./apps.component";
import {AvatarModule } from "@lucasolivamorim/ngx-avatar";
import {MaterialModule} from "../shared/material.module";
import { IntegrateComponent } from './integrate/integrate.component';
import { ShowAppDialogComponent } from './show-app-dialog/show-app-dialog.component';
import {SingleAppComponent} from "./single-app/single-app.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [AppsComponent, IntegrateComponent],
  imports: [
    CommonModule,
    AvatarModule,
    MaterialModule,
    RouterModule
  ],
  entryComponents: [ShowAppDialogComponent],
  providers: [AppsService],
  exports: [AppsComponent]
})
export class AppsModule { }
