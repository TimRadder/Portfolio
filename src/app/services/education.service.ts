import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Education } from '../models/Education';

// Import Environment Variables
import { environment } from '../../environments/environment';
import {Award} from '../models/Awards';
import {Response} from '../models/Response';

@Injectable()
export class EducationService {
  apiUrl = environment.apiURL + 'education';

  constructor(private http: HttpClient) { }

  getAward(id: number): Observable<Response> {
    const url = `${this.apiUrl}/awards/${id}`;
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get<Response>(url, authHttpOptions);
  }

  addAward(award: Award): Observable<Response> {
    const data = {
      award: award
    };
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.post<Response>(this.apiUrl + '/awards/add', data, authHttpOptions).pipe();
  }

  updateAward(award: Award): Observable<Response> {
    const url = `${this.apiUrl}/awards/update/${award.id}`;
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.put<Response>(url, award, authHttpOptions);
  }

  deleteAward(id: number): Observable<Response> {
    const url = `${this.apiUrl}/awards/delete/${id}`;
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.delete<Response>(url, authHttpOptions);
  }

  addExperience(education: Education): Observable<Response> {
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post<Response>(this.apiUrl + '/add', education, authHttpOptions).pipe();
  }

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

  updateEducation(edu: Education): Observable<Response> {
    console.log(edu);
    const url = `${this.apiUrl}/update/${edu.id}`;
    console.log(url);
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put<Response>(url, edu, authHttpOptions);
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
