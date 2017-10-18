import {User} from "./user.model";

export class Notification {
  destUser: User;
  fromUser: User;
  message: String;
  read: boolean;
  date: Date;
}
