import { Component, OnInit } from '@angular/core';
import {ClassService} from '../../class.service';
import {QuizAnswer} from '../../../model/quiz-answer.model';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../../model/quiz.model';
import {Evaluation} from '../../../model/evaluation.model';

@Component({
  selector: 'app-answers-quiz',
  templateUrl: './answers-quiz.component.html',
  styleUrls: ['./answers-quiz.component.scss']
})
export class AnswersQuizComponent implements OnInit {

  quizAnswers: QuizAnswer[] = [];
  evaluations: Evaluation[] = [];
  quiz: Quiz = new Quiz();
  classId = 0; quizId = 0;

  constructor(private classService: ClassService, private route: ActivatedRoute) {
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));
    this.classService.getAnswers(this.classId, this.quizId).subscribe((quizAnswers: QuizAnswer[]) => {
      this.quizAnswers = quizAnswers;
      console.log(this.evaluations);
      for (const qa of this.quizAnswers) {
        qa.answers.sort((a, b) => {if (a.problemId < b.problemId) {return(-1);} if (a.problemId > b.problemId) {return(1);} return(0);});
        this.evaluations.push(new Evaluation());
        this.evaluations[this.evaluations.length - 1].quizAnswer = qa;
      }
      console.log(this.evaluations);
      console.log('sorted' + this.quizAnswers.toString());
    });
    this.classService.getQuiz(this.classId, this.quizId).subscribe((quiz: Quiz) => {
      this.quiz = quiz['quiz'];
      this.quiz.problems.sort((a, b) => {if (a.problemId < b.problemId) {return(-1);} if (a.problemId > b.problemId) {return(1);} return(0);});
      for (let p of this.quiz.problems) {
        if (p.kind) {
          p.alternatives.sort((a, b) => {if (a.alternativeId < b.alternativeId) {return(-1);} if (a.alternativeId > b.alternativeId) {return(1);} return(0);});
        }
      }
      console.log(this.quiz);
    });
  }

  ngOnInit() {
  }

  addScore($event, a) {
    if ($event.checked) {
      this.evaluations[a].openScore += 1;
    } else {
      this.evaluations[a].openScore -= 1;
    }
  }

  calculateScore(a) {
    const total = this.quiz.problems.length;
    let open = 0;
    let closed = 0;
    this.evaluations[a].closedScore = 0;
    for (let p of this.quiz.problems) {
      open += Number(!p.kind);
      closed += Number(p.kind);
      this.evaluations[a].closedScore = Number(this.evaluations[a].closedScore) + Number(p.kind && Number(this.quizAnswers[a].answers[p.problemId - 1].choiceId) === Number(p.answer));
    }
    this.evaluations[a].grade = Math.round(10000 * (Number(this.evaluations[a].openScore) / total + Number(this.evaluations[a].closedScore) / total)) / 100;
    return(this.evaluations[a].grade);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  evaluate(a) {
    this.classService.evaluate(this.classId, this.quizId, this.evaluations[a]).subscribe((data) => {
      console.log(a);
    });
  }

  onKeyPress($event, a) {
    if ($event.keyCode === 13) {
      this.evaluate(a);
    }
  }

}
