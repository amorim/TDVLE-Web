import {Class} from './class.model';

export class StreamItem {
  id: number;
  title: string;
  detail: string;
  dueDate: Date;
  uri: string;
  clazz: Class;
}
