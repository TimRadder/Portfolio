import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';

@Injectable()
export class AuthService {
  configURL = 'http://portfolioapi/api/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Response> {
    return this.http.post<Response>(this.configURL, {username, password}, this.httpOptions).pipe();
  }

  storeJWT(token: string) {
    localStorage.setItem('portfolioJWT', JSON.stringify(token));
  }
  getJWT() {
    if(localStorage.getItem('portfolioJWT') !== null) {
      return JSON.parse(localStorage.getItem('portfolioJWT'));
    } else {
      return '';
    }
  }

  isAuth(token: string): Observable<Boolean> {

      const authHttpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + token
          })
      };
    return this.http.post<Boolean>('http://portfolioapi/api/checkAuth', {}, authHttpOptions);
  }
}
