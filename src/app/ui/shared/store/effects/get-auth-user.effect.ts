import { getAuthUserAction, getAuthUserSuccessAction, getAuthUserFailureAction } from './../actions/get-auth-user.action';
import { AuthService } from './../../services/auth.service';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of, debounceTime } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class GetAuthUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  auth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAuthUserAction),
      switchMap((value) => {
        console.log('effect', value);
        return this.authService.getInfoUser(value.token).pipe(
          map((response: any) => {
            return getAuthUserSuccessAction({ response });
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            getAuthUserFailureAction({ error: errorResponse.error })
          ))
        )
      })
    )
  );
}
