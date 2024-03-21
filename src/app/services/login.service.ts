import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredientials } from './interfaces/UserCrediential';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
  
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({Accept: 'text/plain',
    }),
    responseType: 'text' as 'json',
  };

  loginUser(userCred: UserCredientials):Observable<any> {
    
    return this.http.post<UserCredientials>( this.baseUrl + '/login', userCred);
  }

  getUserId(username: string){
    return this.http.get<number>( this.baseUrl + '/getId/' + username);
  }

}