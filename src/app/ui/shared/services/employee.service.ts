import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { environment } from 'src/environments/environment';

@Injectable()
export class EmployeeService {
  constructor(
    private http: HttpClient
  ) {}

  findUsers(data: string) {
    const url = `${environment.apiUrl}/fio_tn_search`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(`${url}?text=${data}`,  { headers: headers });
  }
}
