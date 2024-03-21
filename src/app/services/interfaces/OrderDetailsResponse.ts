import { Product } from "./Product";
import { User } from "./User";

export interface OrderDetailsResponse{
    status:string;
    user:User;
    products:Product[];
}