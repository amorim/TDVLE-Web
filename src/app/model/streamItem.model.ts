import {Class} from './class.model';
import {Evaluation} from './evaluation.model';

export class StreamItem {
  id: number;
  title: string;
  detail: string;
  dueDate: Date;
  uri: string;
  clazz: Class;
  evaluated = false;
  evaluation: Evaluation;
}
