import {Component, OnInit} from "@angular/core";
import {App} from "../../model/app.model";
import {AppsService} from "../apps.service";
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../../model/user.model";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-single-app',
  templateUrl: './single-app.component.html',
  styleUrls: ['./single-app.component.scss']
})
export class SingleAppComponent implements OnInit {

  appId: string;
  app: App = new App();
  user: User = new User();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private appsService: AppsService) {
    this.userService.getAuthenticatedUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.appId = id;
    this.appsService.getApp(this.appId).subscribe((app: App) => {
      this.app = app;
    });
  }

  approveApp(app: App) {
    this.appsService.approveRequest(app.id).subscribe(done => {
      app.approved = true;

    });
  }

  deleteApp(app: App, i: number) {
    this.appsService.deleteApp(app.id).subscribe(done => {
      this.router.navigate(['apps']);
    });
  }

  isAdmin() {
    if (this.user != null && this.user.authority != null) {
      for (var i = 0; i < this.user.authority.length; i ++) {
        if (this.user.authority[i].authority === 'ROLE_ADMIN') {
          return true;
        }
      }
    }
    return false;
  }

  accessApp(app: App) {
    window.location.href = app.uri;
  }
}
