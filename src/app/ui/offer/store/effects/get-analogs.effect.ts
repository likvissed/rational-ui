import { getAnalogsAction, getAnalogsSuccessAction, getAnalogsFailureAction } from './../actions/get-analogs.action';
import { OfferService } from './../../services/offer.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable()
export class GetAnalogsEffect {
  constructor(
    private actions$: Actions,
    private service: OfferService
  ) {}

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAnalogsAction),
      switchMap((value) => {
        return this.service.getAnalogs(value.data).pipe(
          map((response: any ) => {
            return getAnalogsSuccessAction({response});
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            getAnalogsFailureAction({error: errorResponse.error})
          ))
        )
      })
    )
  );

}
