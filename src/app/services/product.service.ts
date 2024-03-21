import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './interfaces/Product';
import { ProductDao } from './interfaces/ProductDao';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productURL:string = 'http://localhost:8080/products/';
  private adminURL: string = 'http://localhost:8080/admin';

  // public products:Product[] = [];
  
  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get<Product[]>(this.productURL);
  }
  
  addProduct(productDao: ProductDao) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
     
      return this.http.post<Product>(this.adminURL + '/products', productDao, { headers });
  }

  getProductById(pId: number):Observable<any> {
    return this.http.get<any>(this.productURL + pId);
  }
  
  updateProduct(productId: number, productDao: ProductDao): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.put<any>(this.adminURL + '/products/' + productId, productDao, { headers });
  }

  removeProduct(productId: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    
    return this.http.delete(this.adminURL + '/products/' + productId, { headers, responseType: 'text' });
  }

  getProductsByCategory(categoryName: string): Observable<any> {
    return this.http.get(this.productURL+ '/categories/' + categoryName);
  }

}
