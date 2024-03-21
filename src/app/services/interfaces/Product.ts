import { CategoryDao } from "./CategoryDao";

export interface Product{
    id:number;
    title: string;
    price: number;
    description: string;
    category: CategoryDao;
}