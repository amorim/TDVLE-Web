import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor () {

  }

  toggleSidenav() {
    this.sidenav.toggle();
  }


}
