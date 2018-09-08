import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

}
