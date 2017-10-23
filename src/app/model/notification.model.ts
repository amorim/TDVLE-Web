import {User} from "./user.model";

export class Notification {
  id: number;
  destUser: User;
  fromUser: User;
  message: String;
  read: boolean;
  date: Date;
}
