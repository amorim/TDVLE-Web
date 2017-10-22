import {User} from "./user.model";
import {Like} from "./like.model";

export class Post {

  id: number;
  user: User;
  description: String;
  image: String;
  date: Date;
  likes: Like[];
}
