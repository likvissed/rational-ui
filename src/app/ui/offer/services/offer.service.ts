
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OfferService {
  constructor(
    private http: HttpClient
  ) {}

  newOffer() {
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

  getAnalogs(tags: any) {
    const url = `${environment.apiUrl}/analogs`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const params = new HttpParams().append('tags', JSON.stringify(tags));

    return this.http.get(url, { params: params, headers: headers });
  }
}
