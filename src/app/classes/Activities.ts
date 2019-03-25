import {Tasks} from "./Tasks";

export class Activities extends Tasks {
  getModule() {
    return window['moduleLoader'].getLoadedModule('Activities');
  }
}
