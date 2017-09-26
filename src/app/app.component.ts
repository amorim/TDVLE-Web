import { Component } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  user: User = new User();

  constructor () {

  }

  sendUser() {

    console.log(this.user);
  }
}
