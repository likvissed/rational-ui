import { Injectable } from "@angular/core";

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class StorageService {
  tokenName = 'rational-jwt';

  onNewToken(token: any) {
    this.onDeleteToken();
    this.onSetToken(token);
  }

  onDeleteToken() {
    localStorage.removeItem(this.tokenName);
  }

  onGetToken(): string {
    return localStorage.getItem(this.tokenName) || '';
  }

  getJwtPayload(): any {
    const helper = new JwtHelperService();
    let value: string = this.onGetToken();

    return helper.decodeToken(value);
  }

  onSetToken(token: any) {
    localStorage.setItem(this.tokenName, token);
  }
  
}
