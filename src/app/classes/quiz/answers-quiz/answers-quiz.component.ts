import { Component, OnInit } from '@angular/core';
import {ClassService} from '../../class.service';
import {QuizAnswer} from '../../../model/quiz-answer.model';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../../model/quiz.model';

@Component({
  selector: 'app-answers-quiz',
  templateUrl: './answers-quiz.component.html',
  styleUrls: ['./answers-quiz.component.scss']
})
export class AnswersQuizComponent implements OnInit {

  quizAnswers: QuizAnswer[] = [];
  quiz: Quiz = new Quiz();
  classId = 0; quizId = 0;

  constructor(private classService: ClassService, private route: ActivatedRoute) {
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));
    this.classService.getAnswers(this.classId, this.quizId).subscribe((quizAnswers: QuizAnswer[]) => {
      this.quizAnswers = quizAnswers;
      for (const qa of this.quizAnswers) {
        qa.answers.sort((a, b) => {if (a.problemId < b.problemId) {return(-1);} if (a.problemId > b.problemId) {return(1);} return(0);});
      }
      console.log('sorted' + this.quizAnswers.toString());
    });
    this.classService.getQuiz(this.classId, this.quizId).subscribe((quiz: Quiz) => {
      this.quiz = quiz['quiz'];
      this.quiz.problems.sort((a, b) => {if (a.problemId < b.problemId) {return(-1);} if (a.problemId > b.problemId) {return(1);} return(0);});
      console.log(this.quiz);
    });
  }

  ngOnInit() {
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
