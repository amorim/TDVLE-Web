import {User} from "./user.model";

export class Notification {
  id: number;
  destUser: User;
  fromUser: User;
  message: String;
  uri: string;
  read: boolean;
  date: Date;
}
