import { Component, OnInit } from '@angular/core';
import {App} from "../model/app.model";
import {AppsService} from "./apps.service";
import {PageEvent} from "@angular/material";

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  length = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

  apps: App[] = [];

  constructor(private appsService: AppsService) {
    appsService.getApps(this.pageSize, this.pageIndex * this.pageSize).subscribe((apps: App[]) => {
      this.apps = apps;
      appsService.count().subscribe(count => {
        this.length = count['appsCount'];
        this.pageEvent.length = this.length;
      });
    });
  }

  ngOnInit() {

  }

  alterPage() {
    this.appsService.getApps(this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize).subscribe(apps => {
      this.apps = apps;
    });
  }

  requestApp() {
    let app = new App();
    app.name = "Teste";
    app.description = "Testando";
    app.image = "https://go.umaine.edu/wp-content/uploads/sites/10/2017/01/Mobile-Friendly-Application-300x300.png";
    app.uri = "https://www.google.com";
    this.appsService.requestIntegration(app).subscribe();
  }

  accessApp(app: App) {
    window.location.href = app.uri;
  }

}
