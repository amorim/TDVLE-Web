import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../model/quiz.model';
import {ClassService} from '../class.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ShowCreateClassDialogComponent} from '../show-create-class-dialog/show-create-class-dialog.component';
import {Problem} from '../../model/problem.model';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  quiz: Quiz = new Quiz();
  classId = 0;

  constructor(private classService: ClassService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.classId = Number(id);
  }

  create() {
    console.log(this.quiz);
    this.classService.createQuiz(this.quiz, this.classId).subscribe((quiz) => {
      this.snackBar.open('Created quiz', 'Dismiss', {duration: 2000});
      this.router.navigate(['/classes/' + this.classId], );
    });
  }

  validAlternatives(alternatives: String[]) {
    for (const a of alternatives) {
      if (a == null) {
        return(0);
      }
    }
    return(1);
  }

  validProblems() {
    for (const p of this.quiz.problems) {
      if (p.description == null || (p.kind === 1 && (p.answer == null || !this.validAlternatives(p.alternativeDescription)))) {
        return(0);
      }
    }
    return(1);
  }

  addAlternative(problem) {
    problem.alternativeDescription.push('asdf');
  }

  removeAlternative(problem, j) {
    problem.alternativeDescription.splice(j, 1);
  }

  createProblem() {
    this.quiz.problems.push(new Problem());
    console.log(this.quiz.problems);
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.create();
    }
  }
}
