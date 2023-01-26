import { Injectable } from "@angular/core";

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class StorageService {
  tokenName = 'rational-jwt';
  nameDraftForm = 'rational-draft-form';
  nameDraftFiles = 'rational-draft-files';

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

  onSetDraft(data: any) {
    localStorage.setItem(this.nameDraftForm, JSON.stringify(data));
  }

  onGetDraftForm() {
    let value = localStorage.getItem(this.nameDraftForm);

    return value && JSON.parse(value);
  }
  
}
