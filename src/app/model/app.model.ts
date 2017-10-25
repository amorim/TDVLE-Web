import {User} from "./user.model";

export class App {
  id:  number;
  image: string;
  name: string;
  approved: boolean;
  owner: User;
  uri: string;
  description: string;
}
