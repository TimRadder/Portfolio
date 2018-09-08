import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Skill } from '../models/Skill';
import { Response } from '../models/Response';

@Injectable()
export class SkillsService {
  configUrl = 'http://portfolioapi/api/skill';
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Response> {
    return this.http.get<Response>(this.configUrl + 's');
  }

  getSkill(id: number): Observable<Response> {
    const url = `${this.configUrl}/${id}`;
    return this.http.get<Response>(url);
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

    return this.http.post<Response>(this.configUrl + '/add', data, authHttpOptions).pipe();
  }

  updateSkill(skill: Skill): Observable<Response> {
    const url = `${this.configUrl}/update/${skill.id}`;
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
