import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';

// Import Environment Variables
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  apiURL_Login = environment.apiURL + 'login';
  apiURL_CheckAuth = environment.apiURL + 'checkAuth';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Response> {
    return this.http.post<Response>(this.apiURL_Login, {username, password}, this.httpOptions).pipe();
  }

  storeJWT(token: string) {
    localStorage.setItem('portfolioJWT', JSON.stringify(token));
  }

  getJWT() {
    if (localStorage.getItem('portfolioJWT') !== null) {
      return JSON.parse(localStorage.getItem('portfolioJWT'));
    } else {
      return '';
    }
  }

  deleteJWT() {
      localStorage.removeItem('portfolioJWT');
  }

  isAuth(token: string): Observable<Boolean> {

      const authHttpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + token
          })
      };
    return this.http.post<Boolean>(this.apiURL_CheckAuth, {}, authHttpOptions);
  }
}
