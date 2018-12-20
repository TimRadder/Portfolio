import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Experience } from '../models/Experience';
import { Response } from '../models/Response';

@Injectable()
export class ExperienceService {
  configUrl = 'http://portfolioapi/api/exp';

  constructor(private http: HttpClient) { }

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.configUrl + 's');
  }

  getExperience(id: number): Observable<Response> {
    const url = `${this.configUrl}/${id}`;

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
    return this.http.post<Response>(this.configUrl + '/add', experience, authHttpOptions).pipe();
  }

  updateExperience(exp: Experience): Observable<Response> {
    const url = `${this.configUrl}/update/${exp.id}`;
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
    const url = `${this.configUrl}/delete/${id}`;
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
