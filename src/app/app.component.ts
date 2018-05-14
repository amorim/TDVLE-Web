import { Component, OnInit } from '@angular/core';
import {NgxPermissionsService} from "ngx-permissions";
import {HttpClient} from "@angular/common/http";
import {Constants} from "./shared/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
