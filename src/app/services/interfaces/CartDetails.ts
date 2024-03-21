import { CategoryDao } from "./CategoryDao";

export interface CartDetails{
    title: string;
    price: number;
    description: string;
    category: CategoryDao;
    quantity: number;
}