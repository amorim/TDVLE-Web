import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdFormFieldModule, MdInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdFormFieldModule,
    MdInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
