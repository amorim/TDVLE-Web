import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdDatepickerModule, MdFormFieldModule, MdIconModule, MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule, MdSidenavModule,
  MdSnackBarModule, MdToolbarModule, MdTooltipModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MdSnackBarModule,
    MdCardModule,
    MdButtonModule,
    MdCheckboxModule,
    MdFormFieldModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdInputModule,
    MdToolbarModule,
    MdIconModule,
    MdTooltipModule,
    MdSidenavModule,
    MdMenuModule,
    MdListModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    MdSnackBarModule,
    MdCardModule,
    MdButtonModule,
    MdCheckboxModule,
    MdFormFieldModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdInputModule,
    MdToolbarModule,
    MdIconModule,
    MdTooltipModule,
    MdSidenavModule,
    MdMenuModule,
    MdListModule
  ]
})
export class MaterialModule { }
