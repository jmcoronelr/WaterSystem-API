import { Person } from "./Person";
import { Bill } from "./Bill";
import { Asist } from "./Asist";
export interface User extends Person {
  id: Number;
  ci: Number;
  house_number: Number;
  bills: Array<Bill>;
  assists: Array<Asist>;
}
