import {StreamItem} from './streamItem.model';
import {Problem} from './problem.model';

export class Quiz extends StreamItem {
  problems: Problem[] = [];
}
