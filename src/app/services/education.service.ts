import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Education } from '../models/Education';

@Injectable()
export class EducationService {
  configUrl = 'http://portfolioapi/api/education';

  constructor(private http: HttpClient) { }

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.configUrl);
  }

}
