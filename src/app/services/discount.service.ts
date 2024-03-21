import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discount } from './interfaces/Discount';
import { DiscountDao } from './interfaces/DiscountDao';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  
  private discoutURL = 'http://localhost:8080/discount/';
  private baseURL = 'http://localhost:8080/admin';

  constructor(private http:HttpClient) { }
  
  fetchAllDiscount():Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<Discount[]>(this.baseURL+'/discounts', { headers });
  }
  
  generateDiscount(discountDao: DiscountDao): Observable<DiscountDao> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post<DiscountDao>(this.baseURL + '/addDiscount', discountDao, { headers });
  }

  removeDiscount(discountId: number): Observable<DiscountDao>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.delete<DiscountDao>(this.baseURL+'/deleteDiscount/'+ discountId, { headers });
  }



}
