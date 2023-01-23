import { newOfferFailureAction, newOfferSuccessAction } from './../actions/new-offer.action';
import { newOfferAction } from './../actions/new-offer.action';

import { OfferService } from './../../services/offer.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable()
export class NewOfferEffect {
  constructor(
    private actions$: Actions,
    private service: OfferService
  ) {}

  new$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newOfferAction),
      switchMap(() => {
        return this.service.newOffer().pipe(
          map((response: any ) => {
            return newOfferSuccessAction({response});
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            newOfferFailureAction({error: errorResponse.error})
          ))
        )
      })
    )
  );

}
