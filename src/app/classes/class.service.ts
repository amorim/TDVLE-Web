import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Class} from '../model/class.model';
import {Constants} from '../shared/constants';
import {Quiz} from '../model/quiz.model';
import {Activity} from '../model/activity.model';
import {Observable, Observer} from 'rxjs';

@Injectable()
export class ClassService {

  reportData: any = {};

  constructor(private http: HttpClient) {

  }

  enterClass(classAccessCode: string) {
    return this.http.post(Constants.url + '/class/enter', {classAccessCode});
  }

  createClass(clazz: Class) {
    return this.http.post(Constants.url + '/class/create', clazz);
  }

  getClasses(max, offset) {
    return this.http.get(Constants.url + '/class?max=' + max + '&offset=' + offset);
  }

  getClassesCount() {
    return this.http.get(Constants.url + '/class/count');
  }

  getClass(id) {
    return this.http.get(Constants.url + '/class/' + id);
  }

  createQuiz(quiz: Quiz, classId) {
    return this.http.post(Constants.url + '/class/' + classId + '/quiz/create', quiz);
  }

  createActivity(activity: Activity, classId) {
    return this.http.post(Constants.url + '/class/' + classId + '/activity/create', activity);
  }

  getActivity(id) {
    return this.http.get(Constants.url + '/activity/' + id);
  }

  getSubmissions(id) {
    return this.http.get(Constants.url + '/activity/' + id + '/submissions');
  }

  getAllSubmissions(id) {
    return this.http.get(Constants.url + '/activity/' + id + '/allSubmissions');
  }

  sendSubmission(id, submissions) {
    return this.http.post(Constants.url + '/activity/' + id + '/submissions', submissions);
  }


  getQuiz(classId, quizId) {
    return this.http.get(Constants.url + '/class/' + classId + '/quiz/' + quizId);
  }

  getAnswers(classId, quizId) {
    return this.http.get(Constants.url + '/class/' + classId + '/quiz/' + quizId + '/answers');
  }

  submit(classId, quizId, quizAnswer) {
    return this.http.post(Constants.url + '/class/' + classId + '/quiz/' + quizId + '/submit', quizAnswer);
  }

  evaluate(classId, quizId, evaluation) {
    return this.http.post(Constants.url + '/class/' + classId + '/quiz/' + quizId + '/answers/evaluate', evaluation);
  }

  getReport(classId) {
    return;
  }

  downloadReportData(id: string) {
    return Observable.create((observer: Observer<boolean>) => {
      this.http.get(Constants.url + '/class/' + id + '/reporte').subscribe(r => {
        this.reportData = r;
        observer.next(true);
      });
    });
  }

  generateBoletao() {
    return this.http.post(Constants.url + '/class/material', {}, { responseType: 'blob' });
  }
}
