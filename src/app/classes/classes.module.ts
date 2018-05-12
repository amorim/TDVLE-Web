import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarModule } from "@lucasolivamorim/ngx-avatar";
import {MaterialModule} from "../shared/material.module";
import {RouterModule} from "@angular/router";
import {ClassesComponent} from './classes.component';
import {ShowCreateClassDialogComponent} from './show-create-class-dialog/show-create-class-dialog.component';
import {ClassService} from './class.service';
import {ShowEnterClassDialogComponent} from './show-enter-class-dialog/show-enter-class-dialog.component';
import {ClassStreamComponent} from './class-stream/class-stream.component';
import { ShowCreateStreamItemDialogComponent } from './class-stream/show-create-stream-item-dialog/show-create-stream-item-dialog.component';

@NgModule({
  declarations: [ClassesComponent, ClassStreamComponent, ShowCreateStreamItemDialogComponent],
  imports: [
    CommonModule,
    AvatarModule,
    MaterialModule,
    RouterModule
  ],
  entryComponents: [ShowCreateClassDialogComponent, ShowEnterClassDialogComponent],
  providers: [ClassService],
  exports: [ClassesComponent, ClassStreamComponent]
})
export class ClassesModule { }
