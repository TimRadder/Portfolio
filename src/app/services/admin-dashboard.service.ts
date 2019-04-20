import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';

// Import Environment Variables
import { environment } from '../../environments/environment';

@Injectable()
export class AdminDashboardService {
  apiURL = environment.apiURL + 'admin/dashboard';
  constructor(private http: HttpClient) { }

  getDashboard(): Observable<Response> {
    return this.http.get<Response>(this.apiURL);
  }
}
