import { MessageService } from 'primeng/api';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthHelper } from '@iss/ng-auth-center';

@Injectable()
export class ErrorHandlerService {
  str_severity = 'error';

  constructor(
    private authHelper: AuthHelper,
    private messageService: MessageService
  ) {}

  handleError(error: HttpErrorResponse) {
    console.error(error);

    switch (error.status) {
      case 401:
        this.authHelper.logout();
        this.messageService.add({severity: 'warn', summary: 'Не авторизован', detail: 'Авторизуйтесь снова'});

        break;
      case 422:
        this.messageService.add({severity: this.str_severity, summary: 'Ошибка', detail: error.error.error_description});

        break;
      case 403:
        this.messageService.add({severity: this.str_severity, summary: 'Доступ запрещён'});

        break;
      case 404:
        this.messageService.add({severity: this.str_severity, summary: 'Данные не найдены'});

        break;
      case 500:
        this.messageService.add({severity: this.str_severity, summary: 'Сервер временно недоступен'});

        break;
      default:
        this.messageService.add({severity: this.str_severity, summary: 'Сервер временно недоступен', detail: error.statusText});

        break;
    }

  }
}
