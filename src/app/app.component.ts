import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MdSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MdSidenav;
  constructor () {

  }

  toggleSidenav() {
    this.sidenav.toggle();
  }


}
