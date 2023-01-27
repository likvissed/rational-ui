
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

  downloadFile(id: number) {
    const url = `${environment.apiUrl}/download_file`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(`${url}/${id}`,  { headers,  responseType: 'blob' });
  }

  updateRowList(data: any) {
    // TODO: Добавить url
    const url = `${environment.apiUrl}/`;

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(url, data , { headers: headers });
  }
}
