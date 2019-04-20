import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Experience } from '../models/Experience';
import { Response } from '../models/Response';

// Import Environment Variables
import { environment } from '../../environments/environment';

@Injectable()
export class ExperienceService {
  apiURL = environment.apiURL + 'exp';

  constructor(private http: HttpClient) { }

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiURL + 's');
  }

  getExperience(id: number): Observable<Response> {
    const url = `${this.apiURL}/${id}`;

    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get<Response>(url, authHttpOptions);
  }

  addExperience(experience: Experience): Observable<Response> {
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post<Response>(this.apiURL + '/add', experience, authHttpOptions).pipe();
  }

  updateExperience(exp: Experience): Observable<Response> {
    const url = `${this.apiURL}/update/${exp.id}`;
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put<Response>(url, exp, authHttpOptions);
  }

  deleteExperience(id: number): Observable<Response> {
    const url = `${this.apiURL}/delete/${id}`;
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
