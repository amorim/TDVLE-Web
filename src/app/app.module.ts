import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdDatepickerModule, MdNativeDateModule, MdButtonModule, MdCheckboxModule, MdFormFieldModule, MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdSidenavModule, MdToolbarModule, MdTooltipModule } from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    HttpClientModule,
    BrowserAnimationsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
