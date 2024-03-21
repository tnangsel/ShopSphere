import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private baseUrl = 'http://localhost:8080/auth'
  
  constructor(private http: HttpClient, private router:Router) { }

  token = localStorage.getItem('token');
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('usereEmail');
    localStorage.setItem('validToken', 'false');
    this.http.post<any>( this.baseUrl + '/logout', this.token);
    this.router.navigate(['/home']);
  }
  
}