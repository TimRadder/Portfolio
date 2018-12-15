import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/Response';

@Injectable()
export class AdminDashboardService {
  configURL = 'http://portfolioapi/api/admin/dashboard';
  constructor(private http: HttpClient) { }

  getDashboard(): Observable<Response> {
    return this.http.get<Response>(this.configURL);
  }
}
