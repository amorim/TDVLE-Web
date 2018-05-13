import {ProblemAnswer} from './problem-answer.model';
import {User} from './user.model';

export class QuizAnswer {
  answers: ProblemAnswer[] = [];
  student: User;
}
