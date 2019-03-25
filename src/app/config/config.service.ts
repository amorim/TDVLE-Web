import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import {Constants} from "../shared/constants";
import {ItemNode} from "./config.component";

@Injectable()
export class ConfigService {

  settings: ItemNode[];

  constructor(private http: HttpClient) {

  }

  downloadSettings() {
    return Observable.create((observer: Observer<ItemNode[]>) => {
      if (this.settings) {
        observer.next(this.settings);
        return;
      }
      this.http.get(Constants.url + '/features').subscribe((c: ItemNode[]) => {
        this.settings = c;
        observer.next(this.settings);
      });
    });
  }

  updateSettings(s) {
    this.settings = s;
    return this.http.post(Constants.url + '/features', s);
  }
}
