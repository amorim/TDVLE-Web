import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../model/quiz.model';
import {ClassService} from '../class.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quiz: Quiz = new Quiz();
  classId = 0; quizId = 0;

  constructor(private classService: ClassService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));
    this.classService.getQuiz(this.classId, this.quizId).subscribe((quiz: Quiz) => {
      console.log('done: ' + quiz);
      this.quiz = quiz;
    });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  validAlternatives(alternatives: string[]) {
    for (const a of alternatives) {
      if (a == null) {
        return(0);
      }
    }
    return(1);
  }

  validProblems() {
    for (const p of this.quiz.problems) {
      if (p.description == null || (p.kind === true && (p.answer == null || !this.validAlternatives(p.alternativeDescription)))) {
        return(0);
      }
    }
    return(1);
  }

  submit() {
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.submit();
    }
  }
}
