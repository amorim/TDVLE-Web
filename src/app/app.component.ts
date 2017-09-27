import { Component } from '@angular/core';
import { User } from '../model/user.model';
import {HttpClient, HttpClientModule, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Headers, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  user: User = new User();

  constructor (private http: HttpClient) {
  }

  sendUser() {
    // headers.append;
    // let options = new RequestOptions({headers: headers});
    const header = new HttpHeaders({'Authorization' : 'Bearer 0398fb67-7dff-4616-a446-a697921a18c4'});
    console.log(header);

    this.http
      .get('http://localhost:8080/profile', {headers: header})
      .subscribe(data => {
        console.log(data);
      });
    console.log(this.user);
  }
}
