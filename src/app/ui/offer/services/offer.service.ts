
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders, HttpParams, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OfferService {
  constructor(
    private http: HttpClient,
    private handler: HttpBackend
  ) {}

  newOffer() {
    // TODO: Проверить на сервере
    // this.http = new HttpClient(this.handler);

    const url = `${environment.apiUrl}/new`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(url, { headers: headers });
  }

  createOffer(formData: any) {
    const url = `${environment.apiUrl}/new`;

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Content-Type', 'application/json');

    return this.http.post (url, formData, { headers: headers });
  }

  getAnalogs(data: any) {
    const url = `${environment.apiUrl}/analogs`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const params = new HttpParams().append('data', JSON.stringify(data));

    return this.http.get(url, { params: params, headers: headers });
  }

  getLists() {
    const url = `${environment.apiUrl}/list`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(url, { headers: headers });
  }
}
