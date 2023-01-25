import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { StorageService } from 'src/app/ui/shared/services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) {} 

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    const token = this.storageService.onGetToken();

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
          console.log('401 logout');
          // TODO: redirect user to the logout page
        }
      }
        return throwError(err);
      })
    )
  }
}
