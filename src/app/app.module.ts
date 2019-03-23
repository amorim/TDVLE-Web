import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RootModule} from "./root.module";
import {RootComponent} from "./root.component";
import {MaterialModule} from "./shared/material.module";
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from "./register/register.component";
import localeUs from '@angular/common/locales/en';

const routes = [
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent }
];


@NgModule({
  imports: [
    RootModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: false}
    )
  ],
  declarations: [LoginComponent, AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent, LoginComponent],
  providers: []
})

export class AppModule { }
