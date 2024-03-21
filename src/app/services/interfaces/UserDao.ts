import { AddressDao } from "./AddressDao";
import { NameDao } from "./NameDao";

export interface UserDao {
  name: NameDao;
  email: string;
  pass: string;
  address: AddressDao;
  roles: string;
}
