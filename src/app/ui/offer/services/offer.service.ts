
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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
}
