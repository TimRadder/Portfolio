import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Interest } from '../models/Interest';

@Injectable()
export class InterestService {
  configUrl = 'http://portfolioapi/api/interest';

  constructor(private http: HttpClient) { }

  getInterests(): Observable<Interest[]> {
    return this.http.get<Interest[]>(this.configUrl + 's');
  }
}
