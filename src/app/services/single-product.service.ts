import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './interfaces/Product';
import { Observable } from 'rxjs';
import { ProductDao } from './interfaces/ProductDao';

@Injectable({
  providedIn: 'root'
})
export class SingleProductService {

  private baseURL:string = 'http://localhost:8080/';

  productId: number = 0;
  product?:Product;
  constructor(private http:HttpClient) { }

  getProductDetailsById(id: number): Observable<Product> {
    const productUrl:string = this.baseURL + 'products/' + id;
    return this.http.get<Product>(productUrl);
  }
}
