import { Injectable } from '@angular/core';
import {AuthHttp} from "../auth/auth.http";
import {Observable} from "rxjs/Observable";
import {App} from "../model/app.model";
import {Constants} from "../shared/constants";

@Injectable()
export class AppsService {

  constructor(private http: AuthHttp) {

  }

  getApps(max, offset): Observable<App[]> {
    return this.http.get(Constants.url + '/apps?max=' + max + '&offset=' + offset).map(res => res.json());
  }

  getAllApps(max, offset): Observable<App[]> {
    return this.http.get(Constants.url + '/apps/all?max=' + max + '&offset=' + offset).map(res => res.json());
  }

  approveRequest(id): Observable<Object> {
    return this.http.post(Constants.url + '/apps/' + id + '/approve', null).map(res => res.json());
  }

  requestIntegration(app: App): Observable<App> {
    return this.http.post(Constants.url + '/apps', app).map(res => res.json());
  }

  count(): Observable<Object> {
    return this.http.get(Constants.url + '/apps/count').map(res => res.json());
  }

}
