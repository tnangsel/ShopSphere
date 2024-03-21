import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDao } from './interfaces/UserDao';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({Accept: 'text/plain',
    }),
    responseType: 'text' as 'json',
  };

  registerUser(userdao: UserDao): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/register`, userdao, this.httpOptions);
    }
}
