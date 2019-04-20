import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Skill } from '../models/Skill';
import { Response } from '../models/Response';

// Import Environment Variables
import { environment } from '../../environments/environment';

@Injectable()
export class SkillsService {
  apiURL = environment.apiURL + 'skill';
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Response> {
    return this.http.get<Response>(this.apiURL + 's');
  }

  getSkill(id: number): Observable<Response> {
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

  addSkill(skill: Skill): Observable<Response> {
    const data = {
      skill: skill
    };
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.post<Response>(this.apiURL + '/add', data, authHttpOptions).pipe();
  }

  updateSkill(skill: Skill): Observable<Response> {
    const url = `${this.apiURL}/update/${skill.id}`;
    const token = JSON.parse(localStorage.getItem('portfolioJWT'));

    const authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put<Response>(url, skill, authHttpOptions);
  }

  deleteSkill(id: number): Observable<Response> {
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
