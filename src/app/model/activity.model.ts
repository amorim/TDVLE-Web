import {Class} from "./class.model";
import {StreamItem} from './streamItem.model';
import {Submission} from "./submission.model";

export class Activity extends StreamItem {
  teacherSubmissions: Submission[];
}
