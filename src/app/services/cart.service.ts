import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './interfaces/Cart';
import { CartDao } from './interfaces/CartDao';
import { ProductDao } from './interfaces/ProductDao';
import { Wishlist } from './interfaces/Wishlist';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  
  private wishlistURL = 'http://localhost:8080/wishlist/';
  private orderURL = 'http://localhost:8080/orders/';
  private discountURL = 'http://localhost:8080/discount/';
  private baseUrl = 'http://localhost:8080/cart/';

  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }


  getCart(userId: number): Observable<Cart[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Cart[]>(this.baseUrl + userId, { headers });
  }

  addToCart(userId: number, productId: number, quantity: number): Observable<Cart> {
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<Cart>(this.baseUrl + userId + `/add?productId=${productId}&quantity=${quantity}`, {}, { headers });
  }

  removeFromCart(userId: number, productId: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete(this.baseUrl + userId + '/remove/' + productId, { headers, responseType: 'text' });
  }

  updateProductQantity(userId: number, cartDao:CartDao[]) {
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
    });

    return this.http.put<CartDao[]>(this.baseUrl + userId + '/update', cartDao, { headers });
  }
  
  getDiscount(discountCode: string): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.get<number>(this.discountURL + discountCode, { headers });
  }

  placeOrder(productDaoList:ProductDao[]): Observable<any> {
    const userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post<any>(this.orderURL+userId, productDaoList, { headers });
   
  }

  addToWishlist(userId: number, productId: number):Observable<Wishlist> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post<Wishlist>(this.wishlistURL+userId+'/add', productId, { headers });

  }

}
