/**
 * Created by lucas on 25/09/2017.
 */
import {Authority} from './authority.model';

export class User {
  id: number;
  name: String;
  username: String;
  password: String;
  bornDate: Date;
  email: String;
  avatar: String;
  background: String;
  isFollowing: boolean;
  authority: Authority[];
}
