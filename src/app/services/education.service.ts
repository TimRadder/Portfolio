import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Education } from '../models/Education';

// Import Environment Variables
import { environment } from '../../environments/environment';

@Injectable()
export class EducationService {
  apiUrl = environment.apiURL + 'education';

  constructor(private http: HttpClient) { }

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.apiUrl);
  }

  getOneEducation(id: number): Observable<Response> {
    const url = `${this.apiUrl}/${id}`;
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get<Response>(url, authHttpOptions);
  }

  deleteEducation(id: number): Observable<Response> {
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
