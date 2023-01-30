import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  getInfoUser(user: any) {
    const url = `${environment.apiUrl}/authorization`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post (url, user, { headers: headers });
  }
}
