import { AddressDao } from "./AddressDao";
import { NameDao } from "./NameDao";

export interface User{
  id: number;
  name: NameDao;
  email: string;
  pass: string;
  address: AddressDao;
  roles: string;
}