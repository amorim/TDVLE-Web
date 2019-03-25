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
import {Tasks} from "./classes/Tasks";
import {Activities} from "./classes/Activities";
import {Quizzes} from "./classes/Quizzes";
import {SocialFeatures} from "./SocialFeatures";
import {ForumModule} from "./ForumModule";
import {EmbeddedModule} from "./EmbeddedModule";

const routes = [
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent }
];


function loadMobileInterface() {
  applicationInterface['load'].mobile();
}

function loadDesktopInterface() {
  applicationInterface['load'].desktop();
}

// vinculacao dinamica das bibliotecas adequadas a cada interface
let applicationInterface = {
  "dynamicSelector": {
    "if-useragent-mobile": loadMobileInterface(),
    "if-useragent-desktop": loadDesktopInterface()
  },
  "moduleLoaderConfig": {
    "if-activity-feature-enabled": new Activities(),
    "if-quiz-feature-enabled": new Quizzes()
  },
  "overloaded": {
    "overloadedClass": new SocialFeatures()
  }
};


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
