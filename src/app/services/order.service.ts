import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsResponse } from './interfaces/OrderDetailsResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private orderURL = 'http://localhost:8080/orders/'
  constructor(private http:HttpClient) { }
  
  fetchOrderHistory(userEmail: string | null):Observable<OrderDetailsResponse[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<OrderDetailsResponse[]>(this.orderURL+userEmail, { headers });
  }
}
