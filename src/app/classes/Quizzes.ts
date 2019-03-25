import {Tasks} from "./Tasks";

export class Quizzes extends Tasks {
  getModule() {
    return window['moduleLoader'].getLoadedModule('Tasks');
  }

}
