import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './interfaces/User';
import { UserDao } from './interfaces/UserDao';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUserUrl = 'http://localhost:8080/admin/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })
    return this.http.get<User[]>(this.baseUserUrl, { headers });
  }

  getUserById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  
    return this.http.get<any>(this.baseUserUrl + '/' + id, { headers });
  }

  updateUser(userId: number, user: UserDao): Observable<UserDao> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })
    
    return this.http.put<UserDao>(this.baseUserUrl + '/update/' + userId, user, { headers });
  }

  deleteUser(userId: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })
    
    return this.http.delete(this.baseUserUrl + '/' + userId, { headers, responseType: 'text'});
  }

}