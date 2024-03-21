import { CategoryDao } from "./CategoryDao";

export interface ProductDao{
    title: string;
    description: string;
    price: string;
    category: CategoryDao;
}