import {Alternative} from './alternative.model';

export class Problem {
  id: number;
  kind = false;
  description = '';
  alternatives: Alternative[] = [];
  problemId = 0;
  answer = 0;
}
