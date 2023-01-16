import { createOfferAction, createOfferSuccessAction, createOfferFailureAction } from './../actions/create-offer.action';

import { OfferService } from './../../services/offer.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable()
export class CreateOfferEffect {
  constructor(
    private actions$: Actions,
    private service: OfferService
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOfferAction),
      switchMap((value) => {
        return this.service.createOffer(value.data).pipe(
          map((response: any ) => {
            return createOfferSuccessAction({response});
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            createOfferFailureAction({error: errorResponse.error})
          ))
        )
      })
    )
  );

}
