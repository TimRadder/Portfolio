import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Interest } from '../models/Interest';
import { Response } from '../models/Response';

// Import Environment Variables
import { environment } from '../../environments/environment';

@Injectable()
export class InterestService {
  apiUrl = environment.apiURL + 'interests';

  constructor(private http: HttpClient) { }

  getInterests(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  addInterest(interest: Interest): Observable<Response> {
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));
    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.post<Response>(this.apiUrl + '/add', interest, authHttpOptions).pipe();
  }

  updateInterest(interest: Interest): Observable<Response> {
    const url = `${this.apiUrl}/update/${interest.id}`;
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));
    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.put<Response>(url, interest, authHttpOptions);
  }

  deleteInterest(id: number): Observable<Response> {
    const url = `${this.apiUrl}/delete/${id}`;
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));
    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.delete<Response>(url, authHttpOptions);
  }
}
