import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Interest } from '../models/Interest';

// Import Environment Variables
import { environment } from '../../environments/environment';

@Injectable()
export class InterestService {
  apiUrl = environment.apiURL + 'interest';

  constructor(private http: HttpClient) { }

  getInterests(): Observable<Interest[]> {
    return this.http.get<Interest[]>(this.apiUrl + 's');
  }
}
