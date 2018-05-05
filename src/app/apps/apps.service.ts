import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {App} from "../model/app.model";
import {Constants} from "../shared/constants";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppsService {

  constructor(private http: HttpClient) {

  }

  getApp(id) {
    return this.http.get(Constants.url + '/apps/' + id);
  }

  deleteApp(id): Observable<Object> {
    return this.http.delete(Constants.url + '/apps/' + id + '/delete');
  }

  getApps(max, offset) {
    return this.http.get(Constants.url + '/apps?max=' + max + '&offset=' + offset);
  }

  approveRequest(id): Observable<Object> {
    return this.http.post(Constants.url + '/apps/' + id + '/approve', null);
  }

  requestIntegration(app: App) {
    return this.http.post(Constants.url + '/apps', app);
  }

  count(): Observable<Object> {
    return this.http.get(Constants.url + '/apps/count');
  }

}
